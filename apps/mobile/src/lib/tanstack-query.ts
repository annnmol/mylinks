import { QueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
    },
  },
});

export const useQueryStore = (
  queryKey: (string | undefined)[]
): AxiosResponse => queryClient.getQueryData(queryKey) as AxiosResponse;
