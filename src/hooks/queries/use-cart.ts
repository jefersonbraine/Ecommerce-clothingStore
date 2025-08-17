import { useQuery } from "@tanstack/react-query";

export const getUseCartQueryKey = () => ["cart"];

export function useCart() {
  return useQuery({
    queryKey: getUseCartQueryKey(),
    queryFn: async () => {
      // Lógica para buscar os dados do carrinho
    },
  });
}
