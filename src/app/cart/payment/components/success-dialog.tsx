"use client";

import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface SuccessDialogProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function SuccessDialog({ open, setOpen }: SuccessDialogProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        // Não permitir fechar o diálogo clicando fora ou com ESC
        // Apenas pelos botões de ação
        if (!isOpen) {
          setOpen(false);
        }
      }}
    >
      <DialogContent className="flex flex-col items-center p-6 text-center sm:max-w-md">
        <DialogTitle className="sr-only">
          Pedido efetuado com sucesso
        </DialogTitle>
        <Image
          src="/success-order.svg"
          alt="Pedido efetuado com sucesso"
          width={200}
          height={200}
          className="mx-auto"
        />
        <h1 className="mt-4 text-2xl font-bold">Pedido efetuado!</h1>
        <p className="mb-4 font-medium">
          Seu pedido foi efetuado com sucesso. Você pode acompanhar o status na
          seção de Meus Pedidos.
        </p>
        <div className="mb-6 text-lg font-semibold text-green-700">
          Parabéns! Sua jornada de compras foi concluída com sucesso. Obrigado
          por confiar na nossa loja!
        </div>
        <div className="flex w-full flex-col space-y-2">
          <Button
            className="w-full rounded-full"
            size="lg"
            onClick={() => {
              setOpen(false);
              window.location.href = "/my-orders";
            }}
          >
            Ver meus pedidos
          </Button>
          <Button
            className="w-full rounded-full"
            variant="outline"
            size="lg"
            onClick={() => {
              setOpen(false);
              window.location.href = "/";
            }}
          >
            Voltar para a página inicial
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
