import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { userService } from "../services/user.service";

export function useProfile() {
  return useQuery({
    queryKey: queryKeys.users.me,
    queryFn: async () => (await userService.getMe()).data?.user ?? null,
  });
}
