import { QueryClientConfig } from "@tanstack/react-query";

export const queryClientOptions: QueryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
};

export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/"