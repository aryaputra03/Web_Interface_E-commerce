"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { productService } from "../services/product.service";

export function useProductDetail(idOrSlug: string) {
  return useQuery({
    queryKey: queryKeys.products.detail(idOrSlug),
    queryFn: async () => {
      const res = await productService.getByIdOrSlug(idOrSlug);
      return res.data.data?.product ?? null;
    },
    enabled: !!idOrSlug,
  });
}
