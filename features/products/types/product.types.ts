// Tipe data produk, mengikuti skema `products` di dokumentasi Backend (Bab 6.4).
// Field `barcode` WAJIB - dipakai hardware kasir untuk mencocokkan hasil scan QR
// (lihat dokumen kebutuhan Front-End Bab 8).

export interface Product {
  id: string;
  _id: string;
  sku: string;
  barcode: string;
  name: string;
  slug: string;
  description?: string;
  categoryId: string;
  price: number;
  discountPrice?: number;
  images: string[];
  stock: number;
  lowStockThreshold?: number;
  unit?: string;
  averageRating?: number;
  totalReviews?: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductListFilters {
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
  page?: number;
  limit?: number;
}

export interface ProductListMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ProductListResponse {
  items: Product[];
  meta: ProductListMeta;
}

export interface ProductListApiData {
  products?: Product[];
  pagination?: ProductListMeta;
}

export interface CreateProductPayload {
  sku: string;
  barcode: string;
  name: string;
  description?: string;
  categoryId: string;
  price: number;
  discountPrice?: number;
  images: string[];
  stock: number;
  lowStockThreshold?: number;
  unit?: string;
  isActive: boolean;
}

export type UpdateProductPayload = Partial<CreateProductPayload>;
