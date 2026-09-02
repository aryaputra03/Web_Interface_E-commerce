import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { userService } from "../services/user.service";
import type { UpdateProfilePayload } from "../types/user.types";
import { useAuthStore } from "@/features/auth/store/authStore";

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const updateUser = useAuthStore((s) => s.updateUser);

  return useMutation({
    mutationFn: (payload: UpdateProfilePayload) =>
      userService.updateMe(payload),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.me });
      if (res.data?.user)
        updateUser({
          name: res.data.user.name,
          avatarUrl: res.data.user.avatarUrl,
        });
    },
  });
}
