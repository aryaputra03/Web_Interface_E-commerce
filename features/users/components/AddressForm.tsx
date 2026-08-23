"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@/components/feedback-ui/ErrorMessage";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { addressSchema, type AddressSchema } from "../schemas/user.schema";

interface AddressFormProps {
  defaultValues?: Partial<AddressSchema>;
  onSubmit: (values: AddressSchema) => void;
  isSubmitting?: boolean;
  submitError?: string | null;
  onCancel?: () => void;
}

export function AddressForm({
  defaultValues,
  onSubmit,
  isSubmitting,
  submitError,
  onCancel,
}: AddressFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressSchema>({
    resolver: zodResolver(addressSchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <Input
        label="Label Alamat"
        placeholder="Rumah, Kantor, dll"
        error={errors.label?.message}
        {...register("label")}
      />
      <Input
        label="Nama Penerima"
        error={errors.recipientName?.message}
        {...register("recipientName")}
      />
      <Input
        label="Nomor Telepon"
        error={errors.phone?.message}
        {...register("phone")}
      />

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">
          Alamat Lengkap
        </label>
        <textarea
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-100"
          rows={3}
          {...register("addressLine")}
        />
        {errors.addressLine?.message && (
          <p className="mt-1 text-xs text-red-600">
            {errors.addressLine.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input label="Kota" error={errors.city?.message} {...register("city")} />
        <Input
          label="Kode Pos"
          error={errors.postalCode?.message}
          {...register("postalCode")}
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-slate-600">
        <input type="checkbox" {...register("isDefault")} />
        Jadikan alamat utama
      </label>

      {submitError && <ErrorMessage message={submitError} />}

      <div className="flex gap-2">
        <Button type="submit" isLoading={isSubmitting} className="flex-1">
          Simpan Alamat
        </Button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Batal
          </button>
        )}
      </div>
    </form>
  );
}
