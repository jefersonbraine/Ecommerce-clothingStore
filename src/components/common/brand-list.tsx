"use client";

import BrandItem from "./brand-item";

interface Brand {
  id: string;
  name: string;
  logoUrl: string;
  href: string;
}

interface BrandListProps {
  title: string;
  brands: Brand[];
}

const BrandList = ({ title, brands }: BrandListProps) => {
  return (
    <div className="space-y-6 overflow-x-hidden">
      <h3 className="px-5 font-semibold md:px-0">{title}</h3>

      {/* Container com padding suficiente para o efeito hover */}
      <div className="mx-[-8px] px-5 md:px-0">
        <div className="scrollbar-hide flex w-full snap-x gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-4 md:gap-2 lg:grid-cols-7 [&::-webkit-scrollbar]:hidden">
          {brands.map((brand) => (
            <div key={brand.id} className="min-w-[100px] snap-start">
              <BrandItem brand={brand} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandList;
