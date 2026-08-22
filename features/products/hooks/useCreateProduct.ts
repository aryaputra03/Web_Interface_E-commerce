"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { productService } from "../services/product.service";
import type { CreateProductPayload } from "../types/product.types";

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateProductPayload) =>
      productService.create(payload),
    onSuccess: () => {
      // Invalidate seluruh cache 'products' (list di admin & etalase customer)
      // supaya produk baru langsung muncul tanpa perlu refresh manual.
      queryClient.invalidateQueries({ queryKey: queryKeys.products.all });
    },
  });
}
