import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { userService } from "../services/user.service";

export function useDeleteAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => userService.deleteAddress(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.addresses });
    },
  });
}
