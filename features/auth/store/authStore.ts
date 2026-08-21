import { create } from "zustand";
import type { User } from "../types/auth.types";

const SESSION_HINT_COOKIE = "kp_has_session";
const REFRESH_TOKEN_SESSION_KEY = "kp_refresh_token";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  isAuthenticated: boolean;
  /** true selagi initial silent-refresh (mount pertama) berjalan */
  isHydrating: boolean;
  setSession: (params: {
    user: User;
    accessToken: string;
    refreshToken?: string;
  }) => void;
  updateAccessToken: (accessToken: string) => void;
  clearSession: () => void;
  setHydrating: (value: boolean) => void;
}

function setSessionHintCookie() {
  if (typeof document === "undefined") return;
  // Non-sensitif, cuma flag untuk middleware.ts (Fase 1) — bukan validasi keamanan.
  document.cookie = `${SESSION_HINT_COOKIE}=1; path=/; max-age=86400; SameSite=Lax`;
}

function clearSessionHintCookie() {
  if (typeof document === "undefined") return;
  document.cookie = `${SESSION_HINT_COOKIE}=; path=/; max-age=0`;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  refreshToken: null,
  user: null,
  isAuthenticated: false,
  isHydrating: true,

  setSession: ({ user, accessToken, refreshToken }) => {
    if (refreshToken && typeof window !== "undefined") {
      try {
        window.sessionStorage.setItem(REFRESH_TOKEN_SESSION_KEY, refreshToken);
      } catch {
        // sessionStorage tidak tersedia (private mode dsb) — refresh tetap jalan dari memory
      }
    }
    setSessionHintCookie();
    set({
      accessToken,
      refreshToken: refreshToken ?? null,
      user,
      isAuthenticated: true,
      isHydrating: false,
    });
  },

  updateAccessToken: (accessToken) => set({ accessToken }),

  clearSession: () => {
    if (typeof window !== "undefined") {
      try {
        window.sessionStorage.removeItem(REFRESH_TOKEN_SESSION_KEY);
      } catch {
        // abaikan
      }
    }
    clearSessionHintCookie();
    set({
      accessToken: null,
      refreshToken: null,
      user: null,
      isAuthenticated: false,
      isHydrating: false,
    });
  },

  setHydrating: (value) => set({ isHydrating: value }),
}));

export function getStoredRefreshToken(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.sessionStorage.getItem(REFRESH_TOKEN_SESSION_KEY);
  } catch {
    return null;
  }
}
