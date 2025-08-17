"use client";

import { useRouter } from "next/navigation";

import { createNewCart } from "@/actions/create-cart";
import { Button } from "@/components/ui/button";

export default function RepairCartPage() {
  const router = useRouter();

  const handleFixCart = async () => {
    try {
      const result = await createNewCart();
      alert(`Operation completed: ${result.message}`);
      router.push("/");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      alert(`Error: ${errorMessage}`);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-6 text-3xl font-bold">Repair Cart</h1>
      <p className="mb-4">
        This utility page will create a new cart for your account if one does
        not exist. This helps fix issues with the checkout process.
      </p>
      <Button onClick={handleFixCart} size="lg">
        Fix My Cart
      </Button>
    </div>
  );
}
