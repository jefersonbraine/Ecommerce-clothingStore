import { useQuery } from "@tanstack/react-query";

import { getCart } from "@/actions/get-cart";

export const getUserCartQueryKey = ["cart"] as const;

export const useCart = () => {
  return useQuery({
    queryKey: getUserCartQueryKey,
    queryFn: () => getCart(),
  });
};
