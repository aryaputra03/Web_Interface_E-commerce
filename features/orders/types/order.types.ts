export interface CreateOrderPayload {
  fulfillmentType: "delivery" | "pickup";
  deliveryAddress?: string;
  voucherCode?: string | null;
}
export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  subtotal: number;
}
export interface Order {
  id: string;
  orderCode: string;
  status: OrderStatus;
  items: OrderItem[];
  total: number;
  createdAt: string;
}
