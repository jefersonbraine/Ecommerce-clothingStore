import Image from "next/image";

interface PartnerItemProps {
  partner: {
    id: number;
    name: string;
    imageUrl: string;
  };
}

export function PartnerItem({ partner }: PartnerItemProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4">
      <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-[#F1F1F1] p-4">
        <Image
          src={partner.imageUrl}
          alt={partner.name}
          width={32}
          height={32}
          className="fl"
        />
      </div>

      <p className="text-sm font-medium">{partner.name}</p>
    </div>
  );
}
