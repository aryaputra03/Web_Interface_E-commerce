import { useMutation } from "@tanstack/react-query";
import { feedbackService } from "../services/feedback.service";
import type { FeedbackSchema } from "../schemas/feedback.schema";

export function useSubmitFeedback() {
  return useMutation({
    mutationFn: (payload: FeedbackSchema) => feedbackService.submit(payload),
  });
}
