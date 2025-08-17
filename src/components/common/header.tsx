"use client";

import {
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  Package2Icon,
  ShoppingBagIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { authClient } from "@/lib/auth-client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import Cart from "./cart";

export const Header = () => {
  const { data: session } = authClient.useSession();
  return (
    <header className="flex items-center justify-between p-5">
      <Link href="/">
        <Image src="/logo.svg" alt="BEWEAR" width={100} height={26.14} />
      </Link>

      <div className="items center flex gap-3">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent className="flex flex-col">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>

            {/* Área principal do menu que ocupa todo o espaço disponível */}
            <div className="flex flex-1 flex-col gap-6 overflow-y-auto px-5 pt-4">
              {/* Usuário logado ou login */}
              <div>
                {session?.user ? (
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage
                        src={session?.user?.image as string | undefined}
                      />
                      <AvatarFallback>
                        {session?.user?.name?.split(" ")?.[0]?.[0]}
                        {session?.user?.name?.split(" ")?.[1]?.[0]}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <h3 className="font-semibold">{session?.user?.name}</h3>
                      <span className="text-muted-foreground block text-xs">
                        {session?.user?.email}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <h2 className="font-semibold">Olá. Faça seu login!</h2>
                    <Button asChild>
                      <Link
                        href="/authentication"
                        className="flex items-center gap-2"
                      >
                        Login <LogInIcon className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                )}
              </div>

              <Separator className="my-4" />

              {/* Navegação principal */}
              <div className="mt-2 py-2">
                <nav>
                  <ul className="flex flex-col space-y-3">
                    <li>
                      <Link
                        href="/"
                        className="flex items-center gap-2 text-sm font-medium"
                      >
                        <HomeIcon className="h-5 w-5" />
                        Início
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/my-orders"
                        className="flex items-center gap-2 text-sm font-medium"
                      >
                        <Package2Icon className="h-5 w-5" />
                        Meus Pedidos
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          // Fechar o menu e abrir o carrinho
                          document.body.click(); // Fecha o Sheet
                          document.getElementById("cart-trigger")?.click(); // Abre o carrinho
                        }}
                        className="flex w-full items-center gap-2 text-sm font-medium"
                      >
                        <ShoppingBagIcon className="h-5 w-5" />
                        Sacola
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>

              <Separator className="my-2" />

              {/* Categorias */}
              <div className="py-2">
                <nav>
                  <ul className="flex flex-col space-y-3">
                    <li>
                      <Link
                        href="/category/camisetas"
                        className="text-sm font-medium"
                      >
                        Camisetas
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/category/bermuda-shorts"
                        className="text-sm font-medium"
                      >
                        Bermuda & Shorts
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/category/calcas"
                        className="text-sm font-medium"
                      >
                        Calças
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/category/jaquetas-moletons"
                        className="text-sm font-medium"
                      >
                        Jaquetas & Moletons
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/category/tenis"
                        className="text-sm font-medium"
                      >
                        Tênis
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/category/acessorios"
                        className="text-sm font-medium"
                      >
                        Acessórios
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>

            {/* Botão de sair para usuários logados - fixo na parte inferior */}
            {session?.user && (
              <div className="mt-auto border-t p-4">
                <Button
                  variant="outline"
                  className="flex w-full items-center justify-center gap-2"
                  onClick={() => authClient.signOut()}
                >
                  <LogOutIcon className="h-4 w-4" />
                  Sair da conta
                </Button>
              </div>
            )}
          </SheetContent>
        </Sheet>
        <Cart />
      </div>
    </header>
  );
};
