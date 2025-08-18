"use client";

import Link from "next/link";

export default function DirectCheckoutLink() {
  const handleClick = () => {
    // Close the cart sheet
    document.body.click();
  };

  return (
    <div className="mt-2 text-center">
      <Link
        href="/cart/review"
        className="text-primary text-xs hover:underline"
        onClick={handleClick}
      >
        Acessar diretamente
      </Link>
    </div>
  );
}
