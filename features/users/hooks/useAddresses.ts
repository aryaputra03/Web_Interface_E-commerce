import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { userService } from "../services/user.service";

export function useAddresses() {
  return useQuery({
    queryKey: queryKeys.users.addresses,
    queryFn: async () => (await userService.getAddresses()).data ?? [],
  });
}
