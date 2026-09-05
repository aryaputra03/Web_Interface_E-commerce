"use client";

import { useState } from "react";
import { AddressForm } from "@/features/users/components/AddressForm";
import { AddressList } from "@/features/users/components/AddressList";
import { useAddresses } from "@/features/users/hooks/useAddresses";
import { useCreateAddress } from "@/features/users/hooks/useCreateAddress";

export default function ProfileAddressesPage() {
  const { data: addresses = [], isLoading } = useAddresses();
  const createMutation = useCreateAddress();
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="mx-auto max-w-lg px-4 py-8">
      <div className="mb-1 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-ink">Alamat Saya</h1>
        <button
          type="button"
          onClick={() => setShowForm((value) => !value)}
          className="text-sm text-till hover:underline"
        >
          {showForm ? "Batal" : "+ Tambah Alamat"}
        </button>
      </div>
      <p className="mb-6 text-sm text-ink-muted">
        Dipakai saat checkout online.
      </p>

      {showForm && (
        <div className="mb-6 rounded-lg border border-line-strong bg-paper-raised p-4">
          <AddressForm
            isSubmitting={createMutation.isPending}
            submitError={
              createMutation.isError ? "Tidak dapat menyimpan alamat." : null
            }
            onCancel={() => setShowForm(false)}
            onSubmit={(values) =>
              createMutation.mutate(values, {
                onSuccess: () => setShowForm(false),
              })
            }
          />
        </div>
      )}

      <AddressList addresses={addresses} isLoading={isLoading} />
    </div>
  );
}
