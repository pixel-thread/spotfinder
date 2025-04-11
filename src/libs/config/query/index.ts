import { MutationCache, QueryCache, QueryClientConfig } from '@tanstack/react-query';

const queryCacheOptions: QueryCache = new QueryCache({
  onError: (error) => {
    // @ts-ignore
    console.error(error);
  },
});

const mutationCacheOptions: MutationCache = new MutationCache({
  onError: (error) => {
    // @ts-ignore
    console.error(error);
  },
});

export const queryClientOptions: QueryClientConfig = {
  queryCache: queryCacheOptions,
  mutationCache: mutationCacheOptions,
  defaultOptions: {
    queries: {
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
};
