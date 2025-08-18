import { desc } from "drizzle-orm";
import Image from "next/image";
import React from "react";

import BrandList from "@/components/common/brand-list";
import CategorySelector from "@/components/common/category-selector";
import Footer from "@/components/common/footer";
import { Header } from "@/components/common/header";
import { ProductList } from "@/components/common/products-list";
import { db } from "@/db";
import { productTable } from "@/db/schema";

const Home = async () => {
  const products = await db.query.productTable.findMany({
    with: {
      variants: true,
      category: true,
    },
  });

  const newlyCreatedProducts = await db.query.productTable.findMany({
    orderBy: [desc(productTable.createdAt)],
    with: {
      variants: true,
      category: true,
    },
  });

  const categories = await db.query.categoryTable.findMany();

  // Lista de marcas com logos disponíveis
  const brands = [
    {
      id: "1",
      name: "Nike",
      logoUrl: "/nike.svg",
      href: "/brands/nike",
    },
    {
      id: "2",
      name: "Adidas",
      logoUrl: "/adidas.svg",
      href: "/brands/adidas",
    },
    {
      id: "3",
      name: "Puma",
      logoUrl: "/puma.svg",
      href: "/brands/puma",
    },
    {
      id: "4",
      name: "Converse",
      logoUrl: "/converse.svg",
      href: "/brands/converse",
    },
    {
      id: "5",
      name: "New Balance",
      logoUrl: "/new-balance.svg",
      href: "/brands/new-balance",
    },
    {
      id: "6",
      name: "Polo",
      logoUrl: "/polo.svg",
      href: "/brands/polo",
    },
    {
      id: "7",
      name: "Zara",
      logoUrl: "/zara.svg",
      href: "/brands/zara",
    },
  ];

  return (
    <>
      <Header />
      <div className="space-y-6 md:space-y-16">
        <div className="mx-auto max-w-screen-xl px-0 md:mt-6 md:px-5 lg:px-8">
          <div className="relative">
            {/* Imagem mobile */}
            <Image
              src="/banner-01.png"
              alt="Leve uma vida com estilo"
              height={0}
              width={0}
              sizes="100vw"
              className="h-auto w-full rounded-none md:hidden"
            />
            {/* Imagem desktop */}
            <Image
              src="/banner-navegador.png"
              alt="Leve uma vida com estilo"
              height={0}
              width={0}
              sizes="100vw"
              className="hidden h-auto w-full rounded-3xl md:block"
            />
          </div>
        </div>

        <div className="mx-auto max-w-screen-xl px-0 md:px-5 lg:px-8">
          <BrandList brands={brands} title="Marcas parceiras" />
        </div>

        <div className="mx-auto max-w-screen-xl px-0 md:px-5 lg:px-8">
          <ProductList
            products={products}
            title="Mais vendidos"
            category="best-sellers"
          />
        </div>

        <div className="mx-auto max-w-screen-xl px-5 md:px-5 lg:px-8">
          <CategorySelector categories={categories} />
        </div>

        {/* Layout dos banners no formato da imagem de referência - só visível em desktop */}
        <div className="mx-auto hidden max-w-screen-xl px-5 md:block md:px-5 lg:px-8">
          <div className="grid gap-6 md:grid-cols-12">
            {/* Coluna da esquerda com 2 itens empilhados */}
            <div className="space-y-6 md:col-span-5">
              <div className="relative overflow-hidden rounded-3xl bg-slate-200">
                <Image
                  src="/frame1-navegador.png"
                  alt="Nike Therma FIT Headed"
                  height={0}
                  width={0}
                  sizes="100vw"
                  className="h-auto w-full rounded-3xl"
                />
                <div className="absolute top-6 left-0 w-full px-6"></div>
                <div className="absolute bottom-6 flex w-full justify-end px-6"></div>
              </div>
              <div className="relative overflow-hidden rounded-3xl bg-slate-200">
                <Image
                  src="/frame2-navegador.png"
                  alt="Nike Therma FIT Headed"
                  height={0}
                  width={0}
                  sizes="100vw"
                  className="h-auto w-full rounded-3xl"
                />
                <div className="absolute top-6 left-0 w-full px-6"></div>
              </div>
            </div>

            {/* Item grande da direita - com largura aumentada em 10px */}
            <div className="relative overflow-hidden rounded-3xl bg-slate-200 md:col-span-7 md:w-[calc(100%+10px)]">
              <Image
                src="/banner-final-navegador.png"
                alt="Nike Therma FIT Headed"
                height={0}
                width={0}
                sizes="100vw"
                className="h-full w-full rounded-3xl object-cover"
                style={{ height: "100%" }}
              />
              <div className="absolute top-6 left-0 w-full px-6"></div>
              <div className="absolute bottom-6 flex w-full justify-end px-6">
                <div className="self-end"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Versão mobile do banner final - só visível em mobile */}
        <div className="mx-auto max-w-screen-xl px-5 md:hidden md:px-5 lg:px-8">
          <div className="relative">
            <Image
              src="/banner-02.png"
              alt="Seja autentico"
              height={0}
              width={0}
              sizes="100vw"
              className="h-auto w-full rounded-none"
            />
          </div>
        </div>

        <div className="mx-auto max-w-screen-xl px-0 md:px-5 lg:px-8">
          <ProductList
            products={newlyCreatedProducts}
            title="Novos produtos"
            category="new-arrivals"
          />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Home;

// Configuração para forçar renderização dinâmica e evitar problemas com pré-renderização
export const dynamic = "force-dynamic";
