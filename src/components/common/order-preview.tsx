"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

import { getCart } from "@/actions/get-cart";
import { formatCentsToBRL } from "@/helpers/money";

import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";

export const OrderPreview = () => {
  const { data: cart } = useQuery({
    queryKey: ["cart"],
    queryFn: () => getCart(),
  });

  if (!cart || cart.items.length === 0) {
    return null;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Resumo</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {cart.items.map((item) => (
          <div key={item.id} className="flex items-center gap-4">
            <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border">
              <Image
                src={item.productVariant.imageUrl}
                alt={item.productVariant.product.name}
                width={80}
                height={80}
                className="h-full w-full object-cover object-center"
              />
            </div>

            <div className="flex flex-1 flex-col">
              <div className="flex justify-between">
                <h3 className="text-sm font-medium text-gray-900">
                  {item.productVariant.product.name}
                </h3>
                <p className="text-sm font-medium">
                  {formatCentsToBRL(
                    item.productVariant.priceInCents * item.quantity,
                  )}
                </p>
              </div>
              <p className="text-xs text-gray-500">
                {item.productVariant.name}
              </p>
              <p className="mt-1 text-xs text-gray-500">Qtd: {item.quantity}</p>
            </div>
          </div>
        ))}

        <Separator className="my-4" />

        <div className="space-y-3">
          <div className="flex justify-between">
            <p className="text-sm">Subtotal</p>
            <p className="text-sm font-medium">
              {formatCentsToBRL(cart.totalPriceInCents)}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-sm">Transporte e Manuseio</p>
            <p className="text-sm font-medium text-green-500">GRÁTIS</p>
          </div>
          <div className="flex justify-between">
            <p className="text-sm">Taxa Estimada</p>
            <p className="text-sm font-medium">—</p>
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between font-semibold">
            <p>Total</p>
            <p>{formatCentsToBRL(cart.totalPriceInCents)}</p>
          </div>
        </div>

        <Button className="mt-4 w-full">
          <Link href="/cart/identification" className="w-full">
            Continuar
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default OrderPreview;
