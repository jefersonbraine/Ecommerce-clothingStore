"use client";

import { loadStripe } from "@stripe/stripe-js";
import { Loader2 } from "lucide-react";

import { createCheckoutSession } from "@/actions/create-checkout-session";
import { Button } from "@/components/ui/button";
import { useFinishOrder } from "@/hooks/mutations/use-finish-order";

const FinishOrderButton = () => {
  const finishOrderMutation = useFinishOrder();

  const handleFinishOrder = async () => {
    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
      throw new Error("Stripe publishable key is not defined");
    }

    try {
      const { orderId } = await finishOrderMutation.mutateAsync();
      const checkoutSession = await createCheckoutSession({
        orderId,
      });

      // If the checkout session has a URL, redirect directly to it
      // This happens when using mock checkout in development
      if (checkoutSession.url) {
        window.location.href = checkoutSession.url;
        return;
      }

      // Otherwise use Stripe.js to redirect
      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
      );

      if (!stripe) {
        throw new Error("Failed to load Stripe");
      }

      await stripe.redirectToCheckout({
        sessionId: checkoutSession.id,
      });
    } catch (error) {
      console.error("Error in checkout process:", error);
      alert(
        "Ocorreu um erro ao processar o pagamento. Por favor, tente novamente.",
      );
    }
  };

  return (
    <Button
      className="w-full rounded-full"
      size="lg"
      onClick={handleFinishOrder}
      disabled={finishOrderMutation.isPending}
    >
      {finishOrderMutation.isPending && (
        <Loader2 className="h-4 w-4 animate-spin" />
      )}
      Finalizar compra
    </Button>
  );
};

export default FinishOrderButton;
