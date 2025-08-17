"use server";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import Stripe from "stripe";

import { db } from "@/db";
import { orderItemTable, orderTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import {
  CreateCheckoutSessionSchema,
  createCheckoutSessionSchema,
} from "./schema";

export const createCheckoutSession = async (
  data: CreateCheckoutSessionSchema,
) => {
  try {
    // Skip Stripe key check for now
    // if (!process.env.STRIPE_SECRET_KEY) {
    //   throw new Error("Stripe secret key is not set");
    // }

    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    const { orderId } = createCheckoutSessionSchema.parse(data);

    // Get order without relations
    const order = await db.query.orderTable.findFirst({
      where: eq(orderTable.id, orderId),
    });

    if (!order) {
      throw new Error("Order not found");
    }

    if (order.userId !== session.user.id) {
      throw new Error("Unauthorized");
    }

    // Get order items with relations in a single query
    const orderItems = (await db.query.orderItemTable.findMany({
      where: eq(orderItemTable.orderId, orderId),
      with: {
        productVariant: { with: { product: true } },
      },
    })) as Array<{
      productVariant: {
        product: { name: string; description: string };
        name: string;
        imageUrl: string;
      };
      priceInCents: number;
      quantity: number;
    }>;

    // Check if we're using Stripe or mock checkout
    if (
      !process.env.STRIPE_SECRET_KEY ||
      process.env.USE_MOCK_CHECKOUT === "true"
    ) {
      // Use mock Stripe checkout for development
      const mockStripeCheckout = {
        id: "cs_test_" + Math.random().toString(36).substring(2, 15),
        url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/checkout/success?order_id=${orderId}`,
      };

      // Update order status to simulate payment (for testing only)
      await db
        .update(orderTable)
        .set({
          status: "paid",
        })
        .where(eq(orderTable.id, orderId));

      // Return mock checkout session
      return mockStripeCheckout;
    } else {
      // Use real Stripe integration
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

      const checkoutSession = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?order_id=${orderId}`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/cancel`,
        metadata: {
          orderId,
        },
        line_items: orderItems.map((orderItem) => {
          const product = orderItem.productVariant.product ?? {
            name: "Produto",
            description: "",
          };

          return {
            price_data: {
              currency: "brl",
              product_data: {
                name: `${product.name} - ${orderItem.productVariant.name}`,
                description: product.description || "",
                images: orderItem.productVariant.imageUrl
                  ? [orderItem.productVariant.imageUrl]
                  : [],
              },
              unit_amount: orderItem.priceInCents,
            },
            quantity: orderItem.quantity,
          };
        }),
      });

      return checkoutSession;
    }
  } catch (error) {
    console.error("Error in createCheckoutSession:", error);
    throw error;
  }
};
