"use";

import { useQuery } from "@tanstack/react-query";
import { ShoppingBasketIcon } from "lucide-react";
import Image from "next/image";

import { getCart } from "@/actions/get-cart";

import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

const Cart = () => {
  const { data: cart, isPending: cartIsLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: () => getCart(),
  });
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <ShoppingBasketIcon />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Carrinho</SheetTitle>
        </SheetHeader>
        <div>
          {cartIsLoading && <p>Carregando carrinho...</p>}
          {cart?.items.map((item) => (
            <div key={item.id} className="flex items-center gap-4 py-2">
              <Image
                src={item.productVariant.imageUrl}
                alt={item.productVariant.name}
                width={100}
                height={100}
                className="rounded-lg"
              />
              <div>
                <p className="text-sm font-medium">
                  {item.productVariant.product.name}
                </p>
                <p className="text-muted-foreground text-xs">
                  {item.productVariant.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
