"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { productService } from "../services/product.service";
import type { ProductListFilters, ProductListResponse } from "../types/product.types";

const EMPTY_PRODUCT_LIST: ProductListResponse = {
  items: [],
  meta: { page: 1, limit: 0, total: 0, totalPages: 0 },
};

export function useProducts(filters: ProductListFilters = {}) {
  return useQuery({
    queryKey: queryKeys.products.list(filters as Record<string, unknown>),
    queryFn: async () => {
      const res = await productService.getAll(filters);
      const data = res.data.data;

      return {
        items: Array.isArray(data?.products) ? data.products : [],
        meta: data?.pagination ?? EMPTY_PRODUCT_LIST.meta,
      };
    },
    // keepPreviousData supaya UI tidak "kedip" ke skeleton saat ganti halaman/filter,
    // list lama tetap tampil sampai data baru datang.
    placeholderData: (previousData) => previousData,
  });
}
