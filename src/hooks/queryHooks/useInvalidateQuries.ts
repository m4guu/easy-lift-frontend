import { useQueryClient, QueryKey } from "@tanstack/react-query";

export const useInvalidateQueries = (queryKeys: QueryKey[]) => {
  const queryClient = useQueryClient();

  const invalidateQueries = () => {
    queryKeys.map((queryKey) => {
      return queryClient.invalidateQueries(queryKey);
    });
  };

  return { invalidateQueries };
};
