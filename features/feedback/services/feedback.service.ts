import { axiosInstance } from "@/lib/axios";
import type { ApiResponse } from "@/types/api.types";
import type { FeedbackSchema } from "../schemas/feedback.schema";

export const feedbackService = {
  async submit(payload: FeedbackSchema) {
    const { data } = await axiosInstance.post<ApiResponse<null>>(
      "/feedback",
      payload,
    );
    return data;
  },
};
