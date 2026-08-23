import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { userService } from "../services/user.service";
import type { CreateAddressPayload } from "../types/user.types";

export function useCreateAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateAddressPayload) => userService.createAddress(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.addresses });
    },
  });
}
