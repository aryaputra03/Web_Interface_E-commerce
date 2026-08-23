"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { useDeleteAddress } from "../hooks/useDeleteAddress";
import { useUpdateAddress } from "../hooks/useUpdateAddress";
import type { Address } from "../types/user.types";
import { AddressForm } from "./AddressForm";

interface AddressListProps {
  addresses: Address[];
  isLoading: boolean;
}

export function AddressList({ addresses, isLoading }: AddressListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const deleteMutation = useDeleteAddress();
  const updateMutation = useUpdateAddress();

  if (isLoading) {
    return (
      <div className="space-y-2">
        {[...Array(2)].map((_, index) => (
          <div key={index} className="h-24 animate-pulse rounded-lg bg-slate-100" />
        ))}
      </div>
    );
  }

  if (addresses.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-slate-300 p-8 text-center text-slate-400">
        Belum ada alamat tersimpan.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {addresses.map((address) => (
        <div key={address.id} className="rounded-lg border border-slate-200 p-4">
          {editingId === address.id ? (
            <AddressForm
              defaultValues={address}
              isSubmitting={updateMutation.isPending}
              submitError={
                updateMutation.isError ? "Tidak dapat menyimpan perubahan." : null
              }
              onCancel={() => setEditingId(null)}
              onSubmit={(values) =>
                updateMutation.mutate(
                  { id: address.id, payload: values },
                  { onSuccess: () => setEditingId(null) },
                )
              }
            />
          ) : (
            <>
              <div className="flex items-center justify-between">
                <span
                  className={cn(
                    "text-sm font-medium",
                    address.isDefault && "text-blue-600",
                  )}
                >
                  {address.label} {address.isDefault && "(Utama)"}
                </span>
                <div className="flex gap-3 text-xs">
                  <button
                    type="button"
                    onClick={() => setEditingId(address.id)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm(`Hapus alamat \"${address.label}\"?`)) {
                        deleteMutation.mutate(address.id);
                      }
                    }}
                    disabled={deleteMutation.isPending}
                    className="text-red-600 hover:underline disabled:opacity-50"
                  >
                    Hapus
                  </button>
                </div>
              </div>
              <p className="mt-1 text-sm text-slate-600">
                {address.recipientName} · {address.phone}
              </p>
              <p className="text-sm text-slate-500">
                {address.addressLine}, {address.city} {address.postalCode}
              </p>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
