"use client";

import { useEffect, useState } from "react";
import type { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@/components/feedback-ui/ErrorMessage";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { useSubmitFeedback } from "../hooks/useSubmitFeedback";
import {
  feedbackSchema,
  type FeedbackFormInput,
  type FeedbackSchema,
} from "../schemas/feedback.schema";

export function FeedbackForm() {
  const [cooldownSeconds, setCooldownSeconds] = useState(0);
  const submitMutation = useSubmitFeedback();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FeedbackFormInput, unknown, FeedbackSchema>({
    resolver: zodResolver(feedbackSchema),
  });

  useEffect(() => {
    if (cooldownSeconds === 0) return;

    const timer = window.setTimeout(() => {
      setCooldownSeconds((current) => Math.max(0, current - 1));
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [cooldownSeconds]);

  function onSubmit(values: FeedbackSchema) {
    submitMutation.mutate(values, {
      onSuccess: () => reset(),
      onError: (error) => {
        const axiosError = error as AxiosError;

        if (axiosError.response?.status === 429) {
          const retryAfter = Number(axiosError.response.headers["retry-after"]);
          setCooldownSeconds(retryAfter > 0 ? retryAfter : 60);
        }
      },
    });
  }

  const isRateLimited = cooldownSeconds > 0;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <Input label="Nama" error={errors.name?.message} {...register("name")} />
      <Input
        label="Email"
        type="email"
        error={errors.email?.message}
        {...register("email")}
      />

      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-slate-700">
          Rating (opsional)
        </label>
        <select
          className="h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-slate-100"
          {...register("rating", {
            setValueAs: (value) => (value === "" ? undefined : value),
          })}
        >
          <option value="">Pilih rating</option>
          {[1, 2, 3, 4, 5].map((rating) => (
            <option key={rating} value={rating}>
              {rating} bintang
            </option>
          ))}
        </select>
        {errors.rating?.message && (
          <p className="text-xs text-red-600">{errors.rating.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-slate-700">Pesan</label>
        <textarea
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-slate-100"
          rows={4}
          {...register("message")}
        />
        {errors.message?.message && (
          <p className="text-xs text-red-600">{errors.message.message}</p>
        )}
      </div>

      {submitMutation.isError && !isRateLimited && (
        <ErrorMessage message="Tidak dapat mengirim feedback. Coba lagi." />
      )}
      {isRateLimited && (
        <ErrorMessage
          message={`Terlalu banyak percobaan. Coba lagi dalam ${cooldownSeconds} detik.`}
        />
      )}
      {submitMutation.isSuccess && (
        <p className="text-sm text-green-600">Terima kasih atas masukannya!</p>
      )}

      <Button
        type="submit"
        isLoading={submitMutation.isPending}
        disabled={isRateLimited}
        className="w-full"
      >
        Kirim Feedback
      </Button>
    </form>
  );
}
