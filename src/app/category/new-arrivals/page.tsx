import { desc } from "drizzle-orm";
import React from "react";

import Footer from "@/components/common/footer";
import { Header } from "@/components/common/header";
import { ProductsGrid } from "@/components/common/products-grid";
import { db } from "@/db";
import { productTable } from "@/db/schema";

const NewArrivalsPage = async () => {
  // Aqui usamos o desc para ordenar por data de criação
  const newProducts = await db.query.productTable.findMany({
    orderBy: [desc(productTable.createdAt)],
    with: {
      variants: true,
      category: true,
    },
  });

  return (
    <>
      <Header />
      <div className="mx-auto max-w-screen-xl px-5 py-6 md:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold md:text-3xl">Novos produtos</h1>
          <p className="text-muted-foreground mt-2">
            Os últimos lançamentos da nossa coleção
          </p>
        </div>

        <ProductsGrid products={newProducts} />
      </div>
      <Footer />
    </>
  );
};

export default NewArrivalsPage;

// Configuração para forçar renderização dinâmica e evitar problemas com pré-renderização
export const dynamic = "force-dynamic";
