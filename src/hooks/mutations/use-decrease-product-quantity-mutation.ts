import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { decreaseCartProductQuantity } from "@/actions/decrease-cart-product-quantity";

import { getUseCartQueryKey } from "../queries/use-cart";

const getDecreaseProductQuantityMutationKey = (cartItemId: string) =>
  ["decrease-cart-product-quantity", cartItemId] as const;

export function useDecreaseProductQuantityMutation(cartItemId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: getDecreaseProductQuantityMutationKey(cartItemId),
    mutationFn: () => decreaseCartProductQuantity({ cartItemId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getUseCartQueryKey() });
      toast.success("Quantidade do produto diminuída");
    },
  });
}
