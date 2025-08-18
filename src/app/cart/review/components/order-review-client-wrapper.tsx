"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useMediaQuery } from "@/hooks/use-media-query";

export default function OrderReviewClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [initialRenderComplete, setInitialRenderComplete] = useState(false);
  const [hasRedirected, setHasRedirected] = useState(false);

  // Wait for the first render to complete before checking screen size
  useEffect(() => {
    // Use setTimeout to ensure hydration is complete
    const timer = setTimeout(() => {
      setInitialRenderComplete(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Only redirect on client side after initial render and prevent multiple redirects
  useEffect(() => {
    if (initialRenderComplete && !isDesktop && !hasRedirected) {
      console.log("Mobile device detected, redirecting to identification page");
      setHasRedirected(true);
      router.replace("/cart/identification");
    }
  }, [initialRenderComplete, isDesktop, router, hasRedirected]);

  // Render a placeholder during hydration to prevent flash of content
  if (!initialRenderComplete) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-medium">Carregando...</p>
        </div>
      </div>
    );
  }

  // Only render children if we're on desktop
  if (isDesktop) {
    return <>{children}</>;
  }

  // For mobile, render a minimal placeholder until redirect happens
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <p className="text-lg font-medium">
          Redirecionando para identificação...
        </p>
      </div>
    </div>
  );
}
