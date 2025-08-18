"use client";

import {
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  Package2Icon,
  SearchIcon,
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
    <header className="w-full bg-white">
      {/* Primeira linha do header - 3 partes: Saudação, Logo e Ícones */}
      <div className="relative flex items-center justify-between px-5 py-4 md:px-48 lg:px-52">
        {/* Saudação à esquerda */}
        <div className="flex items-center">
          {!session?.user ? (
            <Link
              href="/authentication"
              className="text-sm font-medium hover:underline"
            >
              Olá, Faça seu login!
            </Link>
          ) : (
            <Sheet>
              <SheetTrigger asChild>
                <button className="flex items-center gap-2 text-sm font-medium hover:underline">
                  <span>Olá, {session?.user?.name?.split(" ")[0]}!</span>
                </button>
              </SheetTrigger>
              <SheetContent className="flex flex-col">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>

                {/* Área principal do menu que ocupa todo o espaço disponível */}
                <div className="flex flex-1 flex-col gap-6 overflow-y-auto px-5 pt-4">
                  {/* Usuário logado */}
                  <div>
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

                  {/* Botão de sair para usuários logados - fixo na parte inferior */}
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
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>

        {/* Logo centralizada */}
        <Link
          href="/"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform"
          aria-label="Ir para a página inicial"
        >
          <Image
            src="/logo.svg"
            alt="BEWEAR"
            width={100}
            height={26.14}
            priority
          />
        </Link>

        {/* Ícones à direita */}
        <div className="flex items-center gap-3">
          {/* Busca apenas em desktop */}
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <SearchIcon className="h-5 w-5" />
          </Button>

          {/* Menu apenas em mobile */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <MenuIcon className="h-5 w-5" />
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

                {/* Botão de sair para usuários logados */}
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
              </div>
            </SheetContent>
          </Sheet>

          <Cart />
        </div>
      </div>

      {/* Menu de categorias embaixo - apenas para desktop */}
      <div className="hidden border-b border-gray-200 md:block">
        <div className="mx-auto flex max-w-screen-xl items-center justify-center overflow-x-auto px-4 py-4 md:px-8 lg:px-12">
          <Link
            href="/category/camisetas"
            className="px-3 text-sm font-medium whitespace-nowrap hover:text-gray-500"
          >
            Camisetas
          </Link>
          <Link
            href="/category/bermuda-shorts"
            className="px-3 text-sm font-medium whitespace-nowrap hover:text-gray-500"
          >
            Bermuda & Shorts
          </Link>
          <Link
            href="/category/calcas"
            className="px-3 text-sm font-medium whitespace-nowrap hover:text-gray-500"
          >
            Calças
          </Link>
          <Link
            href="/category/jaquetas-moletons"
            className="px-3 text-sm font-medium whitespace-nowrap hover:text-gray-500"
          >
            Jaquetas & Moletons
          </Link>
          <Link
            href="/category/tenis"
            className="px-3 text-sm font-medium whitespace-nowrap hover:text-gray-500"
          >
            Tênis
          </Link>
          <Link
            href="/category/acessorios"
            className="px-3 text-sm font-medium whitespace-nowrap hover:text-gray-500"
          >
            Acessórios
          </Link>
        </div>
      </div>
    </header>
  );
};
