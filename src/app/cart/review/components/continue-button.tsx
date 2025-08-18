"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export default function ContinueToIdentificationButton() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [isRedirecting, setIsRedirecting] = useState(false);

  // Automatically redirect when authentication status changes
  useEffect(() => {
    if (isRedirecting && !isPending) {
      if (session?.user) {
        // User is authenticated, go to identification page
        router.push("/cart/identification");
      } else {
        // User is not authenticated, go to authentication page with callback
        router.push("/authentication?callbackUrl=/cart/identification");
      }
    }
  }, [isRedirecting, isPending, session, router]);

  const handleContinue = () => {
    setIsRedirecting(true);
  };

  return (
    <Button
      className="mt-4 w-full"
      size="lg"
      onClick={handleContinue}
      disabled={isPending || isRedirecting}
    >
      {isPending
        ? "Verificando..."
        : isRedirecting
          ? "Redirecionando..."
          : "Continuar para identificação"}
    </Button>
  );
}
