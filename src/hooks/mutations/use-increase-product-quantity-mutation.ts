import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { addProductToCart } from "@/actions/add-cart-product";

import { getUseCartQueryKey } from "../queries/use-cart";

const getIncreaseProductQuantityMutationKey = (productVariantId: string) =>
  ["increase-cart-product-quantity", productVariantId] as const;

export function useIncreaseProductQuantityMutation(productVariantId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: getIncreaseProductQuantityMutationKey(productVariantId),
    mutationFn: () => addProductToCart({ productVariantId, quantity: 1 }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getUseCartQueryKey() });
      toast.success("Quantidade do produto aumentada");
    },
  });
}
