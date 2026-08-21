export const POLLING_INTERVAL = {
  POS_SESSIONS: 5_000,
  DEVICES: 20_000,
  NOTIFICATIONS: 20_000,
} as const;

export const RATE_LIMIT_GROUP = {
  AUTH_LOGIN_REGISTER: { limit: 5, windowLabel: "menit" },
  AUTH_GOOGLE: { limit: 10, windowLabel: "menit" },
  PUBLIC: { limit: 100, windowLabel: "menit" },
  PROTECTED_GENERAL: { limit: 60, windowLabel: "menit" },
  FEEDBACK_GROUP: { limit: 10, windowLabel: "10 menit" },
} as const;

export const BARCODE_MIN_LENGTH = 8;
export const POS_SESSION_TIMEOUT_SECONDS = 120;
