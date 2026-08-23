import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { userService } from "../services/user.service";
import type { UpdateAddressPayload } from "../types/user.types";

export function useUpdateAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateAddressPayload }) =>
      userService.updateAddress(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.addresses });
    },
  });
}
