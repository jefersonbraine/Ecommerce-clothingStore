import React from "react";

import Footer from "@/components/common/footer";
import { Header } from "@/components/common/header";
import { ProductsGrid } from "@/components/common/products-grid";
import { db } from "@/db";

const BestSellersPage = async () => {
  // Aqui você pode adicionar lógica real para obter produtos mais vendidos
  // Por exemplo, usando uma coluna 'salesCount' ou similar
  const products = await db.query.productTable.findMany({
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
          <h1 className="text-2xl font-bold md:text-3xl">Mais vendidos</h1>
          <p className="text-muted-foreground mt-2">
            Descubra nossos produtos mais populares
          </p>
        </div>

        <ProductsGrid products={products} />
      </div>
      <Footer />
    </>
  );
};

export default BestSellersPage;

// Configuração para forçar renderização dinâmica e evitar problemas com pré-renderização
export const dynamic = "force-dynamic";
