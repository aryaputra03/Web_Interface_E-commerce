"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { ErrorMessage } from "@/components/feedback-ui/ErrorMessage";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/select";
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
      <Select
        label="Kategori"
        error={errors.category?.message}
        {...register("category")}
        options={[
          { label: "Pilih kategori", value: "" },
          ...CATEGORY_OPTIONS.map((category) => ({
            label: category,
            value: category,
          })),
        ]}
      />

      <div className="space-y-1.5">
        <label
          htmlFor="feedback-message"
          className="block text-sm font-medium text-ink"
        >
          Pesan
        </label>
        <textarea
          id="feedback-message"
          rows={4}
          className="w-full rounded-md border border-line-strong bg-paper-raised px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-till focus:ring-2 focus:ring-till-tint"
          {...register("message")}
        />
        {errors.message?.message && (
          <p className="text-xs text-brick">{errors.message.message}</p>
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
        <p className="text-sm text-till-dark">Terima kasih atas masukannya!</p>
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
