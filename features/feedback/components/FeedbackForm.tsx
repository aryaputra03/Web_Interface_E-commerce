"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { ErrorMessage } from "@/components/feedback-ui/ErrorMessage";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { useRateLimitCountdown } from "@/lib/hooks/useRateLimitCountdown";

import { useSubmitFeedback } from "../hooks/useSubmitFeedback";
import {
  feedbackSchema,
  type FeedbackFormInput,
  type FeedbackSchema,
} from "../schemas/feedback.schema";

const CATEGORY_OPTIONS = ["Bug", "Saran", "Pujian", "Lainnya"] as const;

export function FeedbackForm() {
  const submitMutation = useSubmitFeedback();

  const { cooldownSeconds, isRateLimited, handleRateLimitError } =
    useRateLimitCountdown();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FeedbackFormInput, unknown, FeedbackSchema>({
    resolver: zodResolver(feedbackSchema),
  });

  function onSubmit(values: FeedbackSchema) {
    submitMutation.mutate(values, {
      onSuccess: () => reset(),
      onError: handleRateLimitError,
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      {/* Nama */}
      <Input label="Nama" error={errors.name?.message} {...register("name")} />

      {/* Email */}
      <Input
        label="Email"
        type="email"
        error={errors.email?.message}
        {...register("email")}
      />

      {/* Kategori */}
      <div className="space-y-1.5">
        <label
          htmlFor="feedback-category"
          className="block text-sm font-medium text-slate-700"
        >
          Kategori
        </label>

        <select
          id="feedback-category"
          className="h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-slate-100"
          {...register("category")}
        >
          <option value="">Pilih kategori</option>

          {CATEGORY_OPTIONS.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        {errors.category?.message && (
          <p className="text-xs text-red-600">{errors.category.message}</p>
        )}
      </div>

      {/* Rating */}
      <div className="space-y-1.5">
        <label
          htmlFor="feedback-rating"
          className="block text-sm font-medium text-slate-700"
        >
          Rating (opsional)
        </label>

        <select
          id="feedback-rating"
          className="h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-slate-100"
          {...register("rating", {
            setValueAs: (value) => (value === "" ? undefined : Number(value)),
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

      {/* Pesan */}
      <div className="space-y-1.5">
        <label
          htmlFor="feedback-message"
          className="block text-sm font-medium text-slate-700"
        >
          Pesan
        </label>

        <textarea
          id="feedback-message"
          rows={4}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-slate-100"
          {...register("message")}
        />

        {errors.message?.message && (
          <p className="text-xs text-red-600">{errors.message.message}</p>
        )}
      </div>

      {/* Error */}
      {submitMutation.isError && !isRateLimited && (
        <ErrorMessage message="Tidak dapat mengirim feedback. Coba lagi." />
      )}

      {/* Rate limit */}
      {isRateLimited && (
        <ErrorMessage
          message={`Terlalu banyak percobaan. Coba lagi dalam ${cooldownSeconds} detik.`}
        />
      )}

      {/* Success */}
      {submitMutation.isSuccess && (
        <p className="text-sm text-green-600">Terima kasih atas masukannya!</p>
      )}

      {/* Submit */}
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
