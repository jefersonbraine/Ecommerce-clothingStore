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
      <div className="space-y-6">
        <div>
          <Image
            src="/banner-01.png"
            alt="Leve uma vida com estilo"
            height={0}
            width={0}
            sizes="100vw"
            className="h-auto w-full"
          />
        </div>

        <BrandList brands={brands} title="Marcas parceiras" />

        <ProductList products={products} title="Mais vendidos" />

        <div className="px-5">
          <CategorySelector categories={categories} />
        </div>

        <div className="px-5">
          <Image
            src="/banner-02.png"
            alt="Seja autentico"
            height={0}
            width={0}
            sizes="100vw"
            className="h-auto w-full"
          />
        </div>
        <ProductList products={newlyCreatedProducts} title="Novos produtos" />
        <Footer />
      </div>
    </>
  );
};

export default Home;
