import type { AxiosError, InternalAxiosRequestConfig } from "axios";
import { axiosInstance } from "./axios";

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

type RetryableConfig = InternalAxiosRequestConfig & { _retry?: boolean };

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

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryableConfig | undefined;

    if (
      error.response?.status !== 401 ||
      !originalRequest ||
      originalRequest._retry
    ) {
      // TODO (Fase 14): tangani status 429 per grup endpoint (Bab 13)
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
