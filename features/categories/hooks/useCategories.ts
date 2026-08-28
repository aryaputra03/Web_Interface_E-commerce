"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { categoryService } from "../services/category.service";

export function useCategories() {
  return useQuery({
    queryKey: queryKeys.categories.all,
    queryFn: async () => {
      const res = await categoryService.getAll();
      return res.data.data?.categories ?? [];
    },
    // Kategori jarang berubah — cache lebih lama daripada default supaya
    // tidak fetch ulang tiap kali CategorySelect dipasang di form berbeda.
    staleTime: 5 * 60 * 1000,
  });
}
