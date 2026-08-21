import { QueryClient, isServer } from "@tanstack/react-query";
import type { AxiosError } from "axios";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30 * 1000,
        refetchOnWindowFocus: false,
        retry: (failureCount, error) => {
          const status = (error as AxiosError)?.response?.status;
          if (status === 401 || status === 403 || status === 404) return false;
          return failureCount < 2;
        },
      },
      mutations: { retry: 0 },
    },
  });
}

let browserQueryClient: QueryClient | undefined;

export function getQueryClient() {
  if (isServer) return makeQueryClient();
  if (!browserQueryClient) browserQueryClient = makeQueryClient();
  return browserQueryClient;
}
