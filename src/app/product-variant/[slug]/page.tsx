import { eq } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import Footer from "@/components/common/footer";
import { Header } from "@/components/common/header";
import ProductList from "@/components/common/product-list";
import { db } from "@/db";
import { productTable, productVariantTable } from "@/db/schema";
import { formatCentsToBRL } from "@/helpers/money";

import ProductActions from "./components/product-actions";
import VariantSelector from "./components/variant-selector";

interface ProductVariantPageProps {
  params: Promise<{ slug: string }>;
}

const ProductVariantPage = async ({ params }: ProductVariantPageProps) => {
  const { slug } = await params;
  const productVariant = await db.query.productVariantTable.findFirst({
    where: eq(productVariantTable.slug, slug),
    with: {
      product: {
        with: {
          variants: true,
        },
      },
    },
  });
  if (!productVariant) {
    return notFound();
  }
  const likelyProducts = await db.query.productTable.findMany({
    where: eq(productTable.categoryId, productVariant.product.categoryId),
    with: {
      variants: true,
    },
  });
  return (
    <>
      <Header />

      {/* Layout responsivo - mobile e desktop */}
      <div className="mx-auto max-w-screen-xl px-0 md:px-5 lg:px-8">
        <div className="md:py-8">
          {/* Layout mobile (flex column) */}
          <div className="flex flex-col space-y-6 md:hidden">
            <Image
              src={productVariant.imageUrl}
              alt={productVariant.name}
              sizes="100vw"
              height={0}
              width={0}
              className="h-auto w-full object-cover"
            />

            <div className="px-5">
              <VariantSelector
                selectedVariantSlug={productVariant.slug}
                variants={productVariant.product.variants}
              />
            </div>

            <div className="px-5">
              <h2 className="text-lg font-semibold">
                {productVariant.product.name}
              </h2>
              <h3 className="text-muted-foreground text-sm">
                {productVariant.name}
              </h3>
              <h3 className="text-lg font-semibold">
                {formatCentsToBRL(productVariant.priceInCents)}
              </h3>
            </div>

            <ProductActions productVariantId={productVariant.id} />

            <div className="px-5">
              <p className="text-muted-foreground">
                {productVariant.product.description}
              </p>
            </div>
          </div>

          {/* Layout desktop (grid) - Semelhante à imagem de referência */}
          <div className="hidden md:grid md:grid-cols-12 md:gap-8">
            {/* Coluna esquerda - Miniaturas */}
            <div className="md:col-span-1">
              <div className="sticky top-5 flex flex-col space-y-4">
                {productVariant.product.variants.map((variant) => (
                  <Link
                    href={`/product-variant/${variant.slug}`}
                    key={variant.id}
                    className={`overflow-hidden rounded-xl border ${
                      productVariant.slug === variant.slug
                        ? "border-primary border-2"
                        : "border border-gray-200"
                    } `}
                  >
                    <Image
                      width={80}
                      height={80}
                      src={variant.imageUrl}
                      alt={variant.name}
                      className="h-20 w-20 object-cover"
                    />
                  </Link>
                ))}
              </div>
            </div>

            {/* Coluna central - Imagem principal */}
            <div className="md:col-span-6">
              <div className="overflow-hidden rounded-lg">
                <Image
                  src={productVariant.imageUrl}
                  alt={productVariant.name}
                  sizes="100%"
                  height={0}
                  width={0}
                  className="h-auto w-full object-cover"
                  priority
                />
              </div>
            </div>

            {/* Coluna direita - Informações do produto */}
            <div className="md:col-span-5">
              <div className="flex h-full flex-col space-y-6">
                <div>
                  <h1 className="text-3xl font-bold">
                    {productVariant.product.name}
                  </h1>
                  <h2 className="text-muted-foreground mt-1 text-xl">
                    {productVariant.name}
                  </h2>
                  <h3 className="mt-4 text-2xl font-bold">
                    {formatCentsToBRL(productVariant.priceInCents)}
                  </h3>
                </div>

                <div className="mt-6">
                  <h3 className="mb-4 text-lg font-medium">
                    Selecionar tamanho
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {["P", "M", "G", "GG", "GGG"].map((size) => (
                      <div
                        key={size}
                        className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-gray-300 hover:border-black"
                      >
                        {size}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8">
                  <ProductActions productVariantId={productVariant.id} />
                </div>

                <div className="mt-8 border-t border-gray-200 pt-6">
                  <h3 className="mb-2 text-lg font-medium">Descrição</h3>
                  <p className="text-muted-foreground">
                    {productVariant.product.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <ProductList title="Talvez você goste" products={likelyProducts} />
        </div>

        <Footer />
      </div>
    </>
  );
};

export default ProductVariantPage;
