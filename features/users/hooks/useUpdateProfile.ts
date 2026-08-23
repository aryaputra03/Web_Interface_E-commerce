import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { userService } from "../services/user.service";
import type { UpdateProfilePayload } from "../types/user.types";

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateProfilePayload) => userService.updateMe(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.me });
    },
  });
}
