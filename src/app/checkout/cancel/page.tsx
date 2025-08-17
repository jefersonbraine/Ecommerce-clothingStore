"use client";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";

export default function CheckoutCancelPage() {
  return (
    <Dialog defaultOpen>
      <DialogContent className="sm:max-w-[425px]">
        <div className="flex flex-col items-center gap-4">
          <Image
            src="/window.svg"
            width={100}
            height={100}
            alt="Pedido cancelado"
          />
          <DialogTitle>Pedido cancelado</DialogTitle>
          <DialogDescription>
            Seu pedido foi cancelado. Você pode tentar novamente a qualquer
            momento.
          </DialogDescription>
        </div>
        <DialogFooter>
          <Link href="/" className="w-full">
            <Button className="w-full">Voltar para a loja</Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
