import {
  useQuery as useQueryRq,
  useMutation as useMutationRq,
  QueryClient,
  QueryClientProvider,
  QueryKey,
  UseQueryOptions,
  UseMutationOptions,
  useInfiniteQuery as useInfiniteQueryRq,
  UseInfiniteQueryOptions,
} from '@tanstack/react-query';

/**
 * @function useQuery
 * @description custom hook built on top of userQuery, used to provide default values.
 */
function useQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>({
  refetchOnWindowFocus = false,
  retry = false,
  ...props
}: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>) {
  return useQueryRq({...props, refetchOnWindowFocus, retry});
}

/**
 * @function useMutation
 * @description custom hook built on top of useMutation, used to provide default values.
 */
function useMutation<
  TData = unknown,
  TError = unknown,
  TVariables = void,
  TContext = unknown
>({...props}: UseMutationOptions<TData, TError, TVariables, TContext>) {
  return useMutationRq({...props});
}

/**
 * @function useInfiniteQuery
 * @description custom hook built on top of useInfiniteQuery, used to provide default values.
 */
function useInfiniteQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>({
  refetchOnWindowFocus = false,
  retry = false,
  ...props
}: UseInfiniteQueryOptions<
  TQueryFnData,
  TError,
  TData,
  TQueryFnData,
  TQueryKey
>) {
  return useInfiniteQueryRq({...props, refetchOnWindowFocus, retry});
}

export {
  useQuery,
  useMutation,
  QueryClient,
  QueryClientProvider,
  useInfiniteQuery,
};
