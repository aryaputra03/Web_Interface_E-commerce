export type OrderStatus = "pending" | "paid" | "processing" | "completed" | "cancelled";
export interface OrderItem { productId: string; productName: string; priceSnapshot: number; quantity: number; }
export interface Order { id: string; orderCode: string; status: OrderStatus; items: OrderItem[]; total: number; createdAt: string; }
export interface CreateOrderPayload { voucherCode?: string | null; }
