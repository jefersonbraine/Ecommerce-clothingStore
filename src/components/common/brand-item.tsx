import Image from "next/image";
import Link from "next/link";

interface BrandItemProps {
  brand: {
    id: string;
    name: string;
    logoUrl: string;
    href: string;
  };
}

const BrandItem = ({ brand }: BrandItemProps) => {
  return (
    <Link href={brand.href} className="flex flex-col items-center gap-4 pl-3">
      {/* Adicionando padding em volta para dar espaço para o efeito hover */}
      <div className="transform-gpu p-2">
        <div className="flex h-[100px] w-[100px] items-center justify-center rounded-3xl border-2 p-6 transition-all hover:scale-105 hover:bg-gray-100 md:h-[120px] md:w-[140px]">
          <Image
            src={brand.logoUrl}
            alt={`${brand.name} logo`}
            width={32}
            height={32}
            className="object-contain md:h-12 md:w-12"
          />
        </div>
      </div>
      <div className="flex max-w-[150px] flex-col items-center md:max-w-full">
        <p className="truncate text-center text-sm font-medium md:text-base">
          {brand.name}
        </p>
      </div>
    </Link>
  );
};

export default BrandItem;
