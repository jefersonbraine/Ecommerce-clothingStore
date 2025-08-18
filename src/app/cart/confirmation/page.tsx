import { desc } from "drizzle-orm";
import Image from "next/image";
import { redirect } from "next/navigation";

import { getCart } from "@/actions/get-cart";
import Footer from "@/components/common/footer";
import { Header } from "@/components/common/header";
import { ProductList } from "@/components/common/products-list";
import { db } from "@/db";
import { productTable } from "@/db/schema";
import { authClient } from "@/lib/auth-client";

import FinishOrderButton from "./components/finish-order-button";

export default async function CartConfirmationPage() {
  const { data: session } = await authClient.getSession();
  if (!session?.user) {
    redirect("/authentication");
  }

  const cart = await getCart();
  if (!cart || cart.items.length === 0) {
    redirect("/cart");
  }

  // Buscar produtos recomendados (pegando os 8 produtos mais recentes)
  const recommendedProducts = await db.query.productTable.findMany({
    orderBy: [desc(productTable.createdAt)],
    limit: 8,
    with: {
      variants: true,
    },
  });

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="container mx-auto px-5 pb-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-12">
          {/* Left column - Confirmation */}
          <div className="md:max-w-3xl md:flex-1">
            <h1 className="mb-6 text-2xl font-bold md:text-3xl">
              Confirmar Pedido
            </h1>
            <div className="space-y-6">
              <div className="rounded-lg border p-6">
                <h2 className="mb-4 text-xl font-semibold">Resumo do Pedido</h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Total de itens:</span>
                    <span>{cart.items.length}</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>Total:</span>
                    <span>R$ {(cart.totalPriceInCents / 100).toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <FinishOrderButton />
            </div>
          </div>

          {/* Right column - Order Summary */}
          <div className="md:w-80 md:flex-shrink-0 lg:w-96">
            <div className="rounded-lg border p-6">
              <h2 className="mb-4 text-lg font-semibold">Detalhes dos Itens</h2>
              <div className="space-y-4">
                {cart.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
                      <Image
                        src={item.productVariant.imageUrl}
                        alt={item.productVariant.product.name}
                        width={64}
                        height={64}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <p className="text-sm font-medium">
                        {item.productVariant.product.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {item.productVariant.name}
                      </p>
                      <p className="text-xs">Qtd: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-medium">
                      R${" "}
                      {(
                        (item.productVariant.priceInCents * item.quantity) /
                        100
                      ).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
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
  );
}
