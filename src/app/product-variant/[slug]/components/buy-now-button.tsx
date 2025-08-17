"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { addProductToCart } from "@/actions/add-cart-product";
import { Button } from "@/components/ui/button";
import { getUseCartQueryKey } from "@/hooks/queries/use-cart";
import { authClient } from "@/lib/auth-client";

interface BuyNowButtonProps {
  productVariantId: string;
  quantity: number;
}

const BuyNowButton = ({ productVariantId, quantity }: BuyNowButtonProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: session } = authClient.useSession();
  const { mutate, isPending } = useMutation({
    mutationKey: ["buyNow", productVariantId, quantity],
    mutationFn: () =>
      addProductToCart({
        productVariantId,
        quantity,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getUseCartQueryKey() });
      router.push("/cart/identification");
    },
  });

  function handleBuyNow() {
    if (!session?.user) {
      return router.push("/authentication");
    }
    mutate();
  }

  return (
    <Button
      className="cursor-pointer rounded-full"
      size="lg"
      disabled={isPending}
      onClick={handleBuyNow}
    >
      {isPending && <Loader2 className="animate-spin" />}
      Comprar agora
    </Button>
  );
};

export default BuyNowButton;
