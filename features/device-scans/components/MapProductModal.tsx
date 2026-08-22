"use client";
import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { LoadingSpinner } from "@/components/feedback-ui/LoadingSpinner";
import { EmptyState } from "@/components/ui/EmptyState";
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
  const { showToast } = useToast();

  const handleSelect = (productId: string) => {
    if (!scan) return;
    mutate(
      { id: scan.id, payload: { productId } },
      {
        onSuccess: () => {
          showToast("Scan berhasil dipetakan ke produk.", "success");
          onClose();
        },
        onError: (error) =>
          showToast(
            extractApiErrorMessage(error, "Gagal memetakan produk."),
            "error",
          ),
      },
    );
  };

  return (
    <Modal isOpen={!!scan} onClose={onClose} title="Petakan ke Produk">
      {scan && (
        <div className="flex flex-col gap-4">
          <p className="text-sm text-gray-600">
            Barcode:{" "}
            <span className="font-mono font-medium text-gray-900">
              {scan.barcode}
            </span>
          </p>
          <Input
            placeholder="Cari nama produk..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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
              <ul className="flex flex-col divide-y divide-gray-100">
                {data.items.map((product) => (
                  <li
                    key={product.id}
                    className="flex items-center justify-between gap-2 py-2"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {product.name}
                      </p>
                      <p className="text-xs text-gray-500">
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
