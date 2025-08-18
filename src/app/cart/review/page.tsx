import { desc } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { getCart } from "@/actions/get-cart";
import Footer from "@/components/common/footer";
import { Header } from "@/components/common/header";
import { ProductList } from "@/components/common/products-list";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { db } from "@/db";
import { productTable } from "@/db/schema";
import { formatCentsToBRL } from "@/helpers/money";

import ContinueToIdentificationButton from "./components/continue-button";
import EditCartButton from "./components/edit-cart-button";
import OrderReviewClientWrapper from "./components/order-review-client-wrapper";

export default async function OrderReviewPage() {
  // Get cart without checking authentication
  const cart = await getCart();
  if (!cart || cart.items.length === 0) {
    redirect("/");
  }

  // Buscar produtos recomendados para o carrossel "Você também pode gostar"
  const recommendedProducts = await db.query.productTable.findMany({
    orderBy: [desc(productTable.createdAt)],
    limit: 8,
    with: {
      variants: true,
    },
  });

  return (
    <OrderReviewClientWrapper>
      <div className="flex min-h-screen flex-col">
        <Header />

        {/* Desktop order review layout - mobile redirect handled by wrapper */}
        <div className="container mx-auto py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Revisar Sacola</h1>
            <p className="text-muted-foreground mt-2">
              Revise seus itens antes de prosseguir com o checkout
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Left side - Cart Items */}
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <h2 className="mb-4 text-xl font-semibold">
                    Itens da Sacola ({cart.items.length})
                  </h2>

                  <div className="space-y-6">
                    {cart.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-start gap-4 py-4"
                      >
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
                          <Image
                            src={item.productVariant.imageUrl}
                            alt={item.productVariant.product.name}
                            width={96}
                            height={96}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>

                        <div className="flex flex-1 flex-col">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="text-base font-medium text-gray-900">
                                {item.productVariant.product.name}
                              </h3>
                              <p className="mt-1 text-sm text-gray-500">
                                {item.productVariant.name}
                              </p>
                            </div>
                            <p className="text-base font-medium">
                              {formatCentsToBRL(
                                item.productVariant.priceInCents *
                                  item.quantity,
                              )}
                            </p>
                          </div>

                          <div className="mt-4 flex items-center justify-between text-sm">
                            <p className="text-gray-500">
                              Qtd: {item.quantity}
                            </p>
                            <div className="flex">
                              <EditCartButton>Editar</EditCartButton>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="flex justify-between border-t p-6">
                  <Button variant="outline" asChild>
                    <Link href="/">Continuar Comprando</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <EditCartButton>Editar Sacola</EditCartButton>
                  </Button>
                </CardFooter>
              </Card>
            </div>

            {/* Right side - Order Summary */}
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-6">
                  <h2 className="mb-4 text-xl font-semibold">Resumo</h2>

                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <p>Subtotal</p>
                      <p className="font-medium">
                        {formatCentsToBRL(cart.totalPriceInCents)}
                      </p>
                    </div>

                    <div className="flex justify-between">
                      <p>Transporte e Manuseio</p>
                      <p className="font-medium text-green-500">GRÁTIS</p>
                    </div>

                    <div className="flex justify-between">
                      <p>Taxa Estimada</p>
                      <p className="font-medium">—</p>
                    </div>

                    <Separator />

                    <div className="flex justify-between">
                      <p className="text-lg font-bold">Total</p>
                      <p className="text-lg font-bold">
                        {formatCentsToBRL(cart.totalPriceInCents)}
                      </p>
                    </div>

                    <ContinueToIdentificationButton />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Seção "Você também pode gostar" */}
          <div className="mt-16">
            <ProductList
              title="Você também pode gostar"
              products={recommendedProducts}
              displayType="carousel"
            />
          </div>
        </div>

        <Footer />
      </div>
    </OrderReviewClientWrapper>
  );
}
