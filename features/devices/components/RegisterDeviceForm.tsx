"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@/components/feedback-ui/ErrorMessage";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { useRegisterDevice } from "../hooks/useRegisterDevice";
import { registerDeviceSchema, type RegisterDeviceSchema } from "../schemas/device.schema";
import type { RegisterDeviceResponseData } from "../types/device.types";

interface RegisterDeviceFormProps {
  onRegistered: (data: RegisterDeviceResponseData) => void;
}

export function RegisterDeviceForm({ onRegistered }: RegisterDeviceFormProps) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<RegisterDeviceSchema>({ resolver: zodResolver(registerDeviceSchema) });
  const registerMutation = useRegisterDevice();
  const onSubmit = (values: RegisterDeviceSchema) => {
    registerMutation.mutate(values, { onSuccess: (response) => {
      if (response.data) { onRegistered(response.data); reset(); }
    } });
  };

  return <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
    <Input label="Device ID" placeholder="KASIR-01" error={errors.deviceId?.message} {...register("deviceId")} />
    <Input label="Nama Device" placeholder="Kasir Depan Toko Malang" error={errors.name?.message} {...register("name")} />
    <Input label="Store ID" placeholder="STORE-MLG-01" error={errors.storeId?.message} {...register("storeId")} />
    {registerMutation.isError && <ErrorMessage message="Tidak dapat mendaftarkan device. Coba lagi." />}
    <Button type="submit" isLoading={registerMutation.isPending} className="w-full">Daftarkan Device</Button>
  </form>;
}
