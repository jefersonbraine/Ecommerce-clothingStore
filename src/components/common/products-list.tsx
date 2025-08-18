"use client";

import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";

import { productTable, productVariantTable } from "@/db/schema";

import ProductItem from "./product-item";

interface ProductListProps {
  title: string;
  products: (typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[];
  })[];
  category?: string;
  displayType?: "carousel" | "grid";
}

export function ProductList({
  title,
  products,
  category = "all",
  displayType = "carousel", // Por padrão, usamos carrossel (para manter compatibilidade)
}: ProductListProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Definindo a quantidade exata para scroll (4 produtos + gaps)
  // width de cada produto (260px) * 4 + gap entre produtos (16px) * 3
  const itemWidth = 260; // largura de cada produto em desktop
  const gap = 16; // espaço entre produtos (equivalente a gap-4 no tailwind)
  const scrollAmount = itemWidth * 4 + gap * 3;

  const updateScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 5); // pequena margem para evitar problemas com arredondamento
      // Verificamos se ainda há conteúdo suficiente para mostrar pelo menos um produto mais à direita
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      // Aqui vamos garantir que rolamos exatamente 4 produtos de cada vez
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
      setTimeout(updateScrollButtons, 350);
    }
  };

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      // Aqui também garantimos que voltamos exatamente 4 produtos
      scrollContainerRef.current.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
      setTimeout(updateScrollButtons, 350);
    }
  };

  return (
    <div className="space-y-6">
      <div
        className={`flex items-center justify-between px-5 md:px-0 ${displayType === "grid" ? "mx-auto max-w-screen-xl" : ""}`}
      >
        <h3
          className={`${displayType === "grid" ? "text-2xl font-bold md:text-3xl" : "text-lg font-semibold"}`}
        >
          {title}
        </h3>
        {/* Mostrar botão "Ver todos" apenas quando não estiver na página de categoria (displayType === "carousel") */}
        {displayType === "carousel" && (
          <Link
            href={`/category/${category}`}
            className="flex items-center text-sm hover:underline"
          >
            Ver todos <ChevronRightIcon className="h-4 w-4" />
          </Link>
        )}
      </div>
      {/* Removido bloco de texto duplicado já que agora está na página de categoria */}

      {displayType === "carousel" ? (
        // Exibição em carrossel
        <div className="relative">
          {/* Botão de navegação para esquerda */}
          {canScrollLeft && (
            <button
              onClick={handleScrollLeft}
              className="absolute top-1/2 left-0 z-10 hidden -translate-y-1/2 rounded-full bg-white p-2 shadow-md hover:bg-gray-50 md:block"
              aria-label="Rolar para esquerda"
            >
              <ChevronRightIcon className="h-6 w-6 rotate-180" />
            </button>
          )}

          {/* Container com width ajustado para carrossel */}
          <div className="overflow-hidden px-5 md:px-8">
            <div className="md:relative md:w-full">
              <div
                ref={scrollContainerRef}
                className="scrollbar-hide flex w-full snap-x gap-8 overflow-x-auto [&::-webkit-scrollbar]:hidden"
                style={{ scrollSnapType: "x mandatory" }}
                onScroll={updateScrollButtons}
              >
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="w-[180px] flex-shrink-0 snap-start md:w-[260px]"
                  >
                    <ProductItem
                      product={product}
                      textContainerClassName="max-w-none"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Botão de navegação para direita */}
          {canScrollRight && (
            <button
              onClick={handleScrollRight}
              className="absolute top-1/2 right-0 z-10 hidden -translate-y-1/2 rounded-full bg-white p-2 shadow-md hover:bg-gray-50 md:block"
              aria-label="Rolar para direita"
            >
              <ChevronRightIcon className="h-6 w-6" />
            </button>
          )}
        </div>
      ) : (
        // Exibição em grid centralizado para páginas de categoria
        <div className="px-5 py-4 md:px-8 md:py-6">
          <div className="mx-auto max-w-screen-xl">
            <div className="grid grid-cols-2 justify-items-center gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
              {products.map((product) => (
                <div key={product.id} className="w-full p-2">
                  <ProductItem
                    product={product}
                    textContainerClassName="max-w-none mt-4"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
