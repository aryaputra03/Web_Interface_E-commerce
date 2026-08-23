"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema, type LoginSchema } from "../schemas/auth.schema";
import { useLogin } from "../hooks/useLogin";
import { useRateLimitCountdown } from "@/lib/hooks/useRateLimitCountdown";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { ErrorMessage } from "@/components/feedback-ui/ErrorMessage";

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({ resolver: zodResolver(loginSchema) });
  const loginMutation = useLogin();
  const { cooldownSeconds, isRateLimited, handleRateLimitError } =
    useRateLimitCountdown();

  function onSubmit(values: LoginSchema) {
    loginMutation.mutate(values, {
      onError: handleRateLimitError,
    });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
      noValidate
    >
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
        autoComplete="current-password"
        error={errors.password?.message}
        {...register("password")}
      />

      {loginMutation.isError && !isRateLimited && (
        <ErrorMessage
          message={getLoginErrorMessage(loginMutation.error)}
        />
      )}
      {isRateLimited && (
        <ErrorMessage
          message={`Terlalu banyak percobaan. Coba lagi dalam ${cooldownSeconds} detik.`}
        />
      )}

      <Button
        type="submit"
        isLoading={loginMutation.isPending}
        disabled={isRateLimited}
        className="w-full"
      >
        Masuk
      </Button>
    </form>
  );
}

function getLoginErrorMessage(error: unknown): string {
  const response = (error as { response?: { status?: number; data?: { message?: string } } })?.response;
  if (response?.status === 401) return "Email atau password salah.";
  if (response?.data?.message) return response.data.message;
  return "Tidak dapat terhubung ke server. Silakan coba lagi.";
}
