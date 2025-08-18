"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export default function CheckoutButton() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Check if session is loaded
  useEffect(() => {
    if (isRedirecting && !isPending) {
      // Close the cart sheet
      document.body.click();

      if (session?.user) {
        // User is authenticated, check screen size and redirect accordingly
        const isDesktopView = window.matchMedia("(min-width: 768px)").matches;

        if (isDesktopView) {
          // On desktop, go to review page
          router.push("/cart/review");
        } else {
          // On mobile, skip review and go directly to identification
          router.push("/cart/identification");
        }
      } else {
        // User is not authenticated, go to authentication page with appropriate callback
        const isDesktopView = window.matchMedia("(min-width: 768px)").matches;
        const callbackUrl = isDesktopView
          ? "/cart/review"
          : "/cart/identification";

        router.push(`/authentication?callbackUrl=${callbackUrl}`);
      }
    }
  }, [isRedirecting, session, isPending, router]);
  const handleCheckout = () => {
    setIsRedirecting(true);
  };

  return (
    <Button
      className="mt-5 w-full rounded-full"
      onClick={handleCheckout}
      disabled={isRedirecting || isPending}
    >
      {isRedirecting ? "Aguarde..." : "Finalizar compra"}
    </Button>
  );
}
