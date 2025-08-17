"use client";

import { productTable, productVariantTable } from "@/db/schema";

import ProductItem from "./product-item";

interface ProductListProps {
  title: string;
  products: (typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[];
  })[];
}

export function ProductList({ title, products }: ProductListProps) {
  return (
    <div className="space-y-6">
      <h3 className="px-5 text-lg font-semibold lg:px-8">{title}</h3>
      <div className="flex w-full gap-4 overflow-x-auto px-5 lg:px-8 [&::-webkit-scrollbar]:hidden">
        {products.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            textContainerClassName="max-w-none"
          />
        ))}
      </div>
    </div>
  );
}
