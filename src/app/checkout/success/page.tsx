"use client";

import Image from "next/image";
import Link from "next/link";

import Footer from "@/components/common/footer";
import { Header } from "@/components/common/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function CheckoutSuccessPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex-1 px-5">
        <Card className="mx-auto my-10 max-w-md">
          <CardContent className="flex flex-col items-center p-6 text-center">
            <Image
              src="/success-order.svg"
              alt="Pedido efetuado com sucesso"
              width={200}
              height={200}
              className="mx-auto"
            />
            <h1 className="mt-4 text-2xl font-bold">Pedido efetuado!</h1>
            <p className="mb-4 font-medium">
              Seu pedido foi efetuado com sucesso. Você pode acompanhar o status
              na seção de Meus Pedidos.
            </p>
            <div className="mb-6 text-lg font-semibold text-green-700">
              Parabéns! Sua jornada de compras foi concluída com sucesso.
              Obrigado por confiar na nossa loja!
            </div>
            <div className="flex w-full flex-col space-y-2">
              <Button className="w-full rounded-full" size="lg" asChild>
                <Link href="/my-orders">Ver meus pedidos</Link>
              </Button>
              <Button
                className="w-full rounded-full"
                variant="outline"
                size="lg"
                asChild
              >
                <Link href="/">Voltar para a página inicial</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
