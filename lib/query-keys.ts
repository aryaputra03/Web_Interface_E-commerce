export const queryKeys = {
  products: {
    all: ["products"] as const,
    list: (filters?: Record<string, unknown>) =>
      ["products", "list", filters] as const,
    detail: (idOrSlug: string) => ["products", idOrSlug] as const,
  },
  categories: { all: ["categories"] as const },
  posSessions: { active: ["pos-sessions", "active"] as const },
  deviceScans: {
    all: ["device-scans"] as const,
    list: (filters?: Record<string, unknown>) =>
      ["device-scans", "list", filters] as const,
  },
  devices: { all: ["devices"] as const },
  notifications: {
    all: ["notifications"] as const,
    unread: ["notifications", "unread"] as const,
  },
  stock: {
    history: (filters?: Record<string, unknown>) =>
      ["stock", "history", filters] as const,
    lowStock: ["stock", "low-stock"] as const,
  },
  cart: { current: ["cart"] as const },
  orders: {
    all: ["orders"] as const,
    detail: (id: string) => ["orders", id] as const,
  },
  users: {
    me: ["users", "me"] as const,
  },
};
