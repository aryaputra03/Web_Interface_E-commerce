// Service layer — HANYA fungsi pemanggil axios, tidak ada logic UI/state di sini
// (lihat aturan di dokumen Struktur Folder Bab 3). Endpoint: `GET /categories`
// (dokumen kebutuhan Bab 9.3 / Tabel Pemetaan Bab 14).

import { axiosInstance } from "@/lib/axios";
import type { ApiResponse } from "@/types/api.types";
import type { Category } from "../types/category.types";

export const categoryService = {
  getAll: () => axiosInstance.get<ApiResponse<Category[]>>("/categories"),
};
