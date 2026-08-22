// Tipe data produk, mengikuti skema `products` di dokumentasi Backend (Bab 6.4).
// Field `barcode` WAJIB — dipakai hardware kasir untuk mencocokkan hasil scan QR
// (lihat dokumen kebutuhan Front-End Bab 8).

export interface Product {
  id: string;
  sku?: string;
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

// Query params sesuai dokumentasi Backend Bab 9.3:
// GET /products?search=&category=&minPrice=&maxPrice=&sort=&page=&limit=
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

// CATATAN ASUMSI: dokumen kebutuhan Backend belum menegaskan bentuk persis
// amplop respons list (apakah langsung array, atau { items, meta } dengan
// pagination). Di sini diasumsikan bentuk { items, meta } karena endpoint
// mendukung page & limit. Konfirmasikan ke tim Backend saat integrasi
// pertama kali — kalau ternyata Backend mengembalikan array polos, cukup
// sesuaikan ProductListResponse & product.service.ts, tidak ada bagian lain
// yang perlu diubah karena akses data sudah dipusatkan lewat hook di sini.
export interface ProductListResponse {
  items: Product[];
  meta: ProductListMeta;
}

export type CreateProductPayload = Omit<
  Product,
  "id" | "createdAt" | "updatedAt" | "averageRating" | "totalReviews"
>;

export type UpdateProductPayload = Partial<CreateProductPayload>;
