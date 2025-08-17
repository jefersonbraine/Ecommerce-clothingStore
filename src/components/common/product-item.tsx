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
      className="flex w-[200px] shrink-0 flex-col gap-4"
    >
      <div className="relative h-[200px] w-full overflow-hidden rounded-3xl">
        <Image
          src={firstVariant.imageUrl}
          alt={firstVariant.name}
          fill
          className="object-cover"
        />
      </div>
      <div className={cn("flex w-full flex-col gap-1", textContainerClassName)}>
        <p className="truncate text-sm font-medium">{product.name}</p>
        <p className="text-muted-foreground truncate text-xs font-medium">
          {product.description}
        </p>
        <p className="truncate text-sm font-semibold">
          {formatCentsToBRL(firstVariant.priceInCents)}
        </p>
      </div>
    </Link>
  );
};

export default ProductItem;
