"use client";
import Image from "next/image";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { orderTable } from "@/db/schema";

interface OrderProps {
  orders: Array<{
    id: string;
    number: string; // Adicionamos o número do pedido como #001, #002, etc.
    totalPriceInCents: number;
    status: (typeof orderTable.$inferSelect)["status"];
    createdAt: Date;
    items: Array<{
      id: string;
      imageUrl: string;
      productName: string;
      productVariantName: string;
      priceInCents: number;
      quantity: number;
    }>;
  }>;
}
export function Orders({ orders }: OrderProps) {
  return (
    <div className="space-y-5">
      {orders.map((order) => (
        <Card key={order.id}>
          <CardContent>
            <Accordion type="single" collapsible key={order.id}>
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <div className="flex w-full flex-col gap-1">
                    <div className="flex w-full items-center justify-between">
                      <span className="text-lg font-bold">
                        Número do Pedido
                      </span>
                      <span className="text-lg font-medium">
                        {order.number}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        {order.status === "paid" && <Badge>Pago</Badge>}
                        {order.status === "pending" && (
                          <Badge variant="outline">Pagamento Pendente</Badge>
                        )}
                        {order.status === "canceled" && (
                          <Badge variant="destructive">Cancelado</Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground text-sm">
                        {new Date(order.createdAt).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    {/* Lista de produtos */}
                    <div className="space-y-4">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex items-center gap-4">
                          <div className="flex-shrink-0">
                            <Image
                              src={item.imageUrl}
                              alt={item.productName}
                              width={64}
                              height={64}
                              className="h-16 w-16 rounded-md object-cover"
                            />
                          </div>
                          <div className="flex-grow">
                            <p className="font-medium">{item.productName}</p>
                            <p className="text-muted-foreground text-sm">
                              {item.productVariantName} | {item.quantity}{" "}
                              {item.quantity > 1 ? "unidades" : "unidade"}
                            </p>
                            <p className="font-semibold">
                              R${(item.priceInCents / 100).toFixed(0)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Resumo */}
                    <div className="space-y-2 border-t pt-4">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>
                          R${(order.totalPriceInCents / 100).toFixed(0)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Transporte e Manuseio</span>
                        <span className="text-green-600">Grátis</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Taxa Estimada</span>
                        <span>—</span>
                      </div>
                      <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <span>
                          R${(order.totalPriceInCents / 100).toFixed(0)}
                        </span>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
