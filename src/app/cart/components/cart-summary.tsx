import Image from "next/image";
import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCentsToBRL } from "@/helpers/money";

interface CartSummaryProps {
  subtotalInCents: number;
  totalInCents: number;
  products: Array<{
    id: string;
    name: string;
    variantName: string;
    quantity: number;
    priceInCents: number;
    imageUrl: string;
  }>;
}

export function CartSummary({
  subtotalInCents,
  totalInCents,
  products,
}: CartSummaryProps) {
  return (
    <Card className="w-full max-w-full">
      <CardHeader>
        <CardTitle>Resumo</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between">
          <p className="text-sm">Subtotal</p>
          <p className="text-muted-foreground text-sm font-medium">
            {formatCentsToBRL(subtotalInCents)}
          </p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm">Transporte e Manuseio</p>
          <p className="text-muted-foreground text-sm font-medium">GRÁTIS</p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm">Taxa Estimada</p>
          <p className="text-muted-foreground text-sm font-medium">—</p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm">Total</p>
          <p className="text-muted-foreground text-sm font-medium">
            {formatCentsToBRL(totalInCents)}
          </p>
        </div>

        <div className="py-3">
          <Separator />
        </div>

        {products.map((product, index) => (
          <React.Fragment key={product.id}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  width={78}
                  height={78}
                  className="rounded-lg"
                />
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-semibold">{product.name}</p>
                  <p className="text-muted-foreground text-xs font-medium">
                    {product.variantName}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end justify-center gap-2">
                <p className="text-sm font-bold">
                  {formatCentsToBRL(product.priceInCents * product.quantity)}
                </p>
                <p className="text-muted-foreground text-xs">
                  {product.quantity} x {formatCentsToBRL(product.priceInCents)}
                </p>
              </div>
            </div>
            {index < products.length - 1 && (
              <div className="py-3">
                <Separator />
              </div>
            )}
          </React.Fragment>
        ))}
      </CardContent>
    </Card>
  );
}
