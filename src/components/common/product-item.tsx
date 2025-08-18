import Image from "next/image";
import Link from "next/link";

import { productTable, productVariantTable } from "@/db/schema";
import { formatCentsToBRL } from "@/helpers/money";
import { cn } from "@/lib/utils";

interface ProductItemProps {
  product: typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[];
  };
  textContainerClassName?: string;
}

const ProductItem = ({ product, textContainerClassName }: ProductItemProps) => {
  const firstVariant = product.variants[0];
  return (
    <Link
      href={`/product-variant/${firstVariant.slug}`}
      className="group flex w-full flex-col gap-3"
    >
      <div className="relative h-[180px] w-full overflow-hidden rounded-xl shadow-sm transition-shadow duration-200 hover:shadow md:h-[260px] md:rounded-3xl">
        <Image
          src={firstVariant.imageUrl}
          alt={firstVariant.name}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute right-3 bottom-3 hidden md:flex">
          <div className="rounded-full bg-white px-4 py-2 text-sm font-medium opacity-90 transition-opacity hover:opacity-100">
            Comprar
          </div>
        </div>
      </div>
      <div className={cn("flex w-full flex-col gap-1", textContainerClassName)}>
        <p className="truncate text-sm font-medium md:text-base">
          {product.name}
        </p>
        <p className="text-muted-foreground truncate text-xs font-medium md:text-sm">
          {product.description}
        </p>
        <p className="truncate text-sm font-semibold md:text-base">
          {formatCentsToBRL(firstVariant.priceInCents)}
        </p>
      </div>
    </Link>
  );
};

export default ProductItem;
