export interface CartItem {
  id: string;
  productId: string;
  productName: string;
  productSlug: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface Cart {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

export interface CartApiItem {
  productId: string;
  name: string;
  image: string | null;
  priceSnapshot: number;
  quantity: number;
  subtotal: number;
  currentStock: number;
  isProductActive: boolean;
}

export interface CartApiData {
  items: CartApiItem[];
  subtotal: number;
}
