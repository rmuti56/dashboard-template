import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      // staleTime: 5000,
      // cacheTime: 1000 * 10 // 10 seconds
      // refetchOnWindowFocus: 'always'
    },
  },
});

export default queryClient;
