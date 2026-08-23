"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registerSchema, type RegisterSchema } from "../schemas/auth.schema";
import { useRegister } from "../hooks/useRegister";
import { useRateLimitCountdown } from "@/lib/hooks/useRateLimitCountdown";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { ErrorMessage } from "@/components/feedback-ui/ErrorMessage";

export function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const registerMutation = useRegister();
  const { cooldownSeconds, isRateLimited, handleRateLimitError } =
    useRateLimitCountdown();

  const onSubmit = (values: RegisterSchema) => {
    const { confirmPassword, ...payload } = values;
    void confirmPassword;

    registerMutation.mutate(payload, { onError: handleRateLimitError });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <Input label="Nama" error={errors.name?.message} {...register("name")} />

      <Input
        label="Email"
        type="email"
        autoComplete="email"
        error={errors.email?.message}
        {...register("email")}
      />

      <Input
        label="Password"
        type="password"
        autoComplete="new-password"
        error={errors.password?.message}
        {...register("password")}
      />

      <Input
        label="Konfirmasi Password"
        type="password"
        autoComplete="new-password"
        error={errors.confirmPassword?.message}
        {...register("confirmPassword")}
      />

      {registerMutation.isError && !isRateLimited && (
        <ErrorMessage message="Tidak dapat terhubung ke server. Silakan coba lagi." />
      )}
      {isRateLimited && (
        <ErrorMessage
          message={`Terlalu banyak percobaan. Coba lagi dalam ${cooldownSeconds} detik.`}
        />
      )}

      <Button
        type="submit"
        isLoading={registerMutation.isPending}
        disabled={isRateLimited}
        className="w-full"
      >
        Daftar
      </Button>
    </form>
  );
}
