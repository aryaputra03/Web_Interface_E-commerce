"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { productService } from "../services/product.service";
import type { ProductListFilters } from "../types/product.types";

export function useProducts(filters: ProductListFilters = {}) {
  return useQuery({
    queryKey: queryKeys.products.list(filters),
    queryFn: async () => {
      const res = await productService.getAll(filters);
      return res.data.data;
    },
    // keepPreviousData supaya UI tidak "kedip" ke skeleton saat ganti halaman/filter,
    // list lama tetap tampil sampai data baru datang.
    placeholderData: (previousData) => previousData,
  });
}
