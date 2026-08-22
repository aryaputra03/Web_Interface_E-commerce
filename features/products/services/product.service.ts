// Service layer — HANYA fungsi pemanggil axios, tidak ada logic UI/state.
// Endpoint sesuai dokumen kebutuhan Bab 9.3 / Tabel Pemetaan Bab 14:
//   GET    /products
//   GET    /products/:idOrSlug
//   POST   /products              (admin)
//   PATCH  /products/:id          (admin)
//   DELETE /products/:id          (admin, soft delete)

import { axiosInstance } from "@/lib/axios";
import type { ApiResponse } from "@/types/api.types";
import type {
  Product,
  ProductListFilters,
  ProductListResponse,
  CreateProductPayload,
  UpdateProductPayload,
} from "../types/product.types";

export const productService = {
  getAll: (filters: ProductListFilters = {}) =>
    axiosInstance.get<ApiResponse<ProductListResponse>>("/products", {
      params: filters,
    }),

  getByIdOrSlug: (idOrSlug: string) =>
    axiosInstance.get<ApiResponse<Product>>(`/products/${idOrSlug}`),

  create: (payload: CreateProductPayload) =>
    axiosInstance.post<ApiResponse<Product>>("/products", payload),

  update: (id: string, payload: UpdateProductPayload) =>
    axiosInstance.patch<ApiResponse<Product>>(`/products/${id}`, payload),

  remove: (id: string) =>
    axiosInstance.delete<ApiResponse<null>>(`/products/${id}`),
};
