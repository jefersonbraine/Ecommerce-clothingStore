import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

import { Header } from "@/components/common/header";
import { ProductList } from "@/components/common/products-list";
import { db } from "@/db";
import { categoryTable, productTable } from "@/db/schema";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { slug } = await params;
  const category = await db.query.categoryTable.findFirst({
    where: eq(categoryTable.slug, slug),
  });
  if (!category) {
    return notFound();
  }
  const products = await db.query.productTable.findMany({
    where: eq(productTable.categoryId, category.id),
    with: {
      variants: true,
    },
  });

  return (
    <>
      <Header />
      <div className="mx-auto max-w-screen-xl px-4 py-8 md:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold md:text-3xl">{category.name}</h1>
          <p className="text-muted-foreground mt-2">
            Confira nossa seleção de {category.name.toLowerCase()}
          </p>
        </div>

        <ProductList
          title=""
          products={products}
          displayType="grid"
          category={slug}
        />
      </div>
    </>
  );
};

export default CategoryPage;

// Configuração para forçar renderização dinâmica e evitar problemas com pré-renderização
export const dynamic = "force-dynamic";
