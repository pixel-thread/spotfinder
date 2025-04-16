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
  queryCache: new QueryCache(),
  mutationCache: new MutationCache(),
  defaultOptions: {
    queries: { retry: false },
    mutations: { retry: false },
  },
};
