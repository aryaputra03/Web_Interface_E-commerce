import { axiosInstance } from "@/lib/axios";
import type { ApiResponse } from "@/types/api.types";
import type {
  Product,
  ProductListFilters,
  ProductListApiData,
  CreateProductPayload,
  UpdateProductPayload,
} from "../types/product.types";

export const productService = {
  getAll: (filters: ProductListFilters = {}) =>
    axiosInstance.get<ApiResponse<ProductListApiData>>("/products", {
      params: filters,
    }),

  getByIdOrSlug: (idOrSlug: string) =>
    axiosInstance.get<ApiResponse<{ product: Product }>>(
      `/products/${idOrSlug}`,
    ),

  create: (payload: CreateProductPayload) =>
    axiosInstance.post<ApiResponse<{ product: Product }>>("/products", payload),

  update: (id: string, payload: UpdateProductPayload) =>
    axiosInstance.patch<ApiResponse<{ product: Product }>>(
      `/products/${id}`,
      payload,
    ),

  remove: (id: string) =>
    axiosInstance.delete<ApiResponse<null>>(`/products/${id}`),
};
