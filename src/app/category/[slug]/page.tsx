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
      }
  });

  return (
    <>
      <Header />
      <div className="space-y-6">
        <ProductList title={category.name} products={products} />
      </div>
    </>
  );
};

export default CategoryPage;
