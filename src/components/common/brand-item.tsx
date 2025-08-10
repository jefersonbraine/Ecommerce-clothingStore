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
    <Link href={brand.href} className="flex flex-col items-center gap-4">
      <div className="flex h-[120px] w-[120px] items-center justify-center rounded-3xl border-2 p-6 transition-colors hover:bg-gray-100">
        <Image
          src={brand.logoUrl}
          alt={`${brand.name} logo`}
          width={32}
          height={32}
          className="object-contain"
        />
      </div>
      <div className="flex max-w-[120px] flex-col items-center">
        <p className="truncate text-center text-sm font-medium">{brand.name}</p>
      </div>
    </Link>
  );
};

export default BrandItem;
