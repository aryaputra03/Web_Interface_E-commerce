"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useAddToCart } from "../hooks/useAddToCart";

export function AddToCartButton({ productId, disabled }: { productId: string; disabled?: boolean }) {
  const [added, setAdded] = useState(false);
  const addToCartMutation = useAddToCart();
  function handleClick() { addToCartMutation.mutate({ productId, quantity: 1 }, { onSuccess: () => { setAdded(true); setTimeout(() => setAdded(false), 1500); } }); }
  return <Button type="button" onClick={handleClick} isLoading={addToCartMutation.isPending} disabled={disabled}>{added ? "Ditambahkan!" : "Tambah ke Keranjang"}</Button>;
}
