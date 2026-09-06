"use client";
import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/Button";
import { LoadingSpinner } from "@/components/feedback-ui/LoadingSpinner";
import { EmptyState } from "@/components/ui/empty-state";
import { useToast } from "@/components/ui/Toast";
import { useProducts } from "@/features/products";
import { useMapProduct } from "../hooks/useMapProduct";
import { formatCurrency, extractApiErrorMessage } from "@/lib/utils";
import type { DeviceScan } from "../types/deviceScan.types";

export interface MapProductModalProps {
  scan: DeviceScan | null;
  onClose: () => void;
}

export function MapProductModal({ scan, onClose }: MapProductModalProps) {
  const [search, setSearch] = useState("");
  const { data, isLoading } = useProducts({
    search: search || undefined,
    limit: 10,
  });
  const { mutate, isPending } = useMapProduct();
  const { toast } = useToast();

  const handleSelect = (productId: string) => {
    if (!scan) return;
    mutate(
      { id: scan.id, payload: { productId } },
      {
        onSuccess: () => {
          toast("Scan berhasil dipetakan ke produk.", "success");
          onClose();
        },
        onError: (error) =>
          toast(
            extractApiErrorMessage(error, "Gagal memetakan produk."),
            "error",
          ),
      },
    );
  };

  return (
    <Modal open={!!scan} onClose={onClose} title="Petakan ke Produk">
      {scan && (
        <div className="flex flex-col gap-4">
          <p className="text-sm text-ink-muted">
            Barcode:{" "}
            <span className="font-mono font-medium text-ink">
              {scan.barcode}
            </span>
          </p>
          <Input
            placeholder="Cari nama produk..."
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target.value)
            }
            autoFocus
          />
          <div className="max-h-64 overflow-y-auto">
            {isLoading && (
              <div className="flex justify-center py-6">
                <LoadingSpinner />
              </div>
            )}
            {!isLoading && (data?.items.length ?? 0) === 0 && (
              <EmptyState
                title="Produk tidak ditemukan"
                description="Coba kata kunci lain."
              />
            )}
            {!isLoading && data && data.items.length > 0 && (
              <ul className="flex flex-col divide-y divide-line">
                {data.items.map((product) => (
                  <li
                    key={product.id}
                    className="flex items-center justify-between gap-2 py-2"
                  >
                    <div>
                      <p className="text-sm font-medium text-ink">
                        {product.name}
                      </p>
                      <p className="text-xs text-ink-muted">
                        {formatCurrency(product.price)} · {product.barcode}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="secondary"
                      isLoading={isPending}
                      onClick={() => handleSelect(product.id)}
                    >
                      Pilih
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </Modal>
  );
}
