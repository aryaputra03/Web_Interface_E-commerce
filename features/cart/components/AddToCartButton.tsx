"use client";

import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { useAddToCart } from "../hooks/useAddToCart";

export function AddToCartButton({
  productId,
  disabled,
  size = "md",
  compact = false,
}: {
  productId: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  compact?: boolean;
}) {
  const addToCartMutation = useAddToCart();
  const { toast } = useToast();

  function handleClick() {
    addToCartMutation.mutate(
      { productId, quantity: 1 },
      { onSuccess: () => toast("Ditambahkan ke keranjang.", "success", 2000) },
    );
  }

  return (
    <Button
      type="button"
      size={size}
      onClick={handleClick}
      isLoading={addToCartMutation.isPending}
      disabled={disabled}
      className={compact ? "w-full" : undefined}
    >
      {compact ? "+ Keranjang" : "Tambah ke Keranjang"}
    </Button>
  );
}
