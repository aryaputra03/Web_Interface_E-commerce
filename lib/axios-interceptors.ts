import type { AxiosError, InternalAxiosRequestConfig } from "axios";
import { axiosInstance } from "./axios";
import { showToast } from "./toast-bridge";

interface AuthHandlers {
  getAccessToken: () => string | null;
  refreshAccessToken: () => Promise<string | null>;
  onRefreshFailed: () => void;
}

let authHandlers: AuthHandlers = {
  getAccessToken: () => null,
  refreshAccessToken: async () => null,
  onRefreshFailed: () => {
    if (typeof window !== "undefined") {
      // eslint-disable-next-line @next/next/no-location-assign-relative-destination
      window.location.href = "/login";
    }
  },
};

export function registerAuthHandlers(handlers: AuthHandlers) {
  authHandlers = handlers;
}

axiosInstance.interceptors.request.use((config) => {
  const token = authHandlers.getAccessToken();
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

type RetryableConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
  _rateLimitRetried?: boolean;
};

let isRefreshing = false;
let pendingQueue: Array<{
  resolve: (token: string | null) => void;
  reject: (err: unknown) => void;
}> = [];

function flushQueue(error: unknown, token: string | null) {
  pendingQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve(token);
  });
  pendingQueue = [];
}

const SELF_HANDLED_RATE_LIMIT_PATHS = [
  "/auth/login",
  "/auth/register",
  "/auth/google",
  "/feedback",
  "/reviews",
  "/testimonials",
];

function isSelfHandledPath(url: string | undefined): boolean {
  return !!url && SELF_HANDLED_RATE_LIMIT_PATHS.some((path) => url.includes(path));
}

function getRetryAfterMs(error: AxiosError): number {
  const seconds = Number(error.response?.headers?.["retry-after"]);
  return (Number.isFinite(seconds) && seconds > 0 ? seconds : 5) * 1000;
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryableConfig | undefined;

    if (error.response?.status === 429 && originalRequest) {
      if (isSelfHandledPath(originalRequest.url)) return Promise.reject(error);

      if (!originalRequest._rateLimitRetried) {
        originalRequest._rateLimitRetried = true;
        showToast("Terlalu banyak permintaan, mencoba lagi sebentar lagi...", "info");
        await sleep(getRetryAfterMs(error));
        return axiosInstance(originalRequest);
      }

      showToast("Server sedang sibuk, coba lagi beberapa saat lagi.", "error");
      return Promise.reject(error);
    }

    if (
      error.response?.status !== 401 ||
      !originalRequest ||
      originalRequest._retry
    ) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        pendingQueue.push({
          resolve: (token) => {
            if (token) {
              originalRequest.headers = originalRequest.headers ?? {};
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            resolve(axiosInstance(originalRequest));
          },
          reject,
        });
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const newToken = await authHandlers.refreshAccessToken();
      isRefreshing = false;

      if (!newToken) {
        flushQueue(error, null);
        authHandlers.onRefreshFailed();
        return Promise.reject(error);
      }

      flushQueue(null, newToken);
      originalRequest.headers = originalRequest.headers ?? {};
      originalRequest.headers.Authorization = `Bearer ${newToken}`;
      return axiosInstance(originalRequest);
    } catch (refreshError) {
      isRefreshing = false;
      flushQueue(refreshError, null);
      authHandlers.onRefreshFailed();
      return Promise.reject(refreshError);
    }
  },
);
