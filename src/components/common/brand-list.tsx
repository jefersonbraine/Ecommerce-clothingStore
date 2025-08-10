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
    <div className="space-y-6">
      <h3 className="px-5 font-semibold">{title}</h3>

      <div className="flex w-full gap-4 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden">
        {brands.map((brand) => (
          <BrandItem key={brand.id} brand={brand} />
        ))}
      </div>
    </div>
  );
};

export default BrandList;
