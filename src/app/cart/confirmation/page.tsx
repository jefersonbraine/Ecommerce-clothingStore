import { redirect } from "next/navigation";

import { getCart } from "@/actions/get-cart";
import Footer from "@/components/common/footer";
import { Header } from "@/components/common/header";
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

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="container mx-auto flex-1 px-4 py-8">
        <div className="mx-auto max-w-2xl">
          <h1 className="mb-8 text-3xl font-bold">Confirmar Pedido</h1>
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
      </div>
      <Footer />
    </div>
  );
}
