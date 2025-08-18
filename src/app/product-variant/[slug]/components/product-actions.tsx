"use client";

import { MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

import AddToCartButton from "./add-to-cart-button";
import BuyNowButton from "./buy-now-button";

interface ProductActionsProps {
  productVariantId: string;
}

const ProductActions = ({ productVariantId }: ProductActionsProps) => {
  const [quantity, setQuantity] = useState(1);

  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  return (
    <>
      <div className="md:space-y-6">
        <div className="space-y-4 px-5 md:px-0">
          <h3 className="font-medium">Quantidade</h3>
          <div className="flex w-[140px] items-center justify-between rounded-lg border">
            <Button size="icon" variant="ghost" onClick={handleDecrement}>
              <MinusIcon />
            </Button>
            <p className="text-lg font-medium">{quantity}</p>
            <Button size="icon" variant="ghost" onClick={handleIncrement}>
              <PlusIcon />
            </Button>
          </div>
        </div>
        <div className="mt-6 flex flex-col space-y-4 px-5 md:mt-8 md:px-0">
          <AddToCartButton
            productVariantId={productVariantId}
            quantity={quantity}
          />
          <BuyNowButton
            productVariantId={productVariantId}
            quantity={quantity}
          />
        </div>
      </div>
    </>
  );
};

export default ProductActions;
