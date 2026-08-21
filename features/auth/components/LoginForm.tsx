"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { AxiosError } from "axios";
import { loginSchema, type LoginSchema } from "../schemas/auth.schema";
import { useLogin } from "../hooks/useLogin";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ErrorMessage } from "@/components/feedback-ui/ErrorMessage";

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({ resolver: zodResolver(loginSchema) });
  const loginMutation = useLogin();

  return (
    <form
      onSubmit={handleSubmit((values) => loginMutation.mutate(values))}
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

      {loginMutation.isError && (
        <ErrorMessage
          message={getLoginErrorMessage(
            loginMutation.error as AxiosError<{ message?: string }>,
          )}
        />
      )}

      <Button
        type="submit"
        isLoading={loginMutation.isPending}
        className="w-full"
      >
        Masuk
      </Button>
    </form>
  );
}

function getLoginErrorMessage(error: AxiosError<{ message?: string }>): string {
  if (error.response?.status === 401) return "Email atau password salah.";
  if (error.response?.data?.message) return error.response.data.message;
  return "Tidak dapat terhubung ke server. Silakan coba lagi.";
}
