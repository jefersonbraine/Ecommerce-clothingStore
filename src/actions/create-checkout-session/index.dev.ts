"use server";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";
// Import Stripe mock for development purposes
// import Stripe from "stripe";
// Using a mock for testing without real Stripe API keys
import { redirect } from "next/navigation";

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
  // For development without Stripe keys, comment out the check below
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
  const order = await db.query.orderTable.findFirst({
    where: eq(orderTable.id, orderId),
  });
  if (!order) {
    throw new Error("Order not found");
  }
  if (order.userId !== session.user.id) {
    throw new Error("Unauthorized");
  }

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

  // DEVELOPMENT MOCK: Instead of using Stripe, directly update order status
  // and return a mock session with success URL

  // In production with Stripe keys, use the commented code below
  /*
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const checkoutSession = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/cancel`,
    metadata: {
      orderId,
    },
    line_items: orderItems.map((orderItem) => {
      const product = orderItem.productVariant.product ?? {
        name: "Produto",
        description: "",
        imageUrl: "",
      };
      return {
        price_data: {
          currency: "brl",
          product_data: {
            name: `${product.name} - ${orderItem.productVariant.name}`,
            description: product.description,
            images: [orderItem.productVariant.imageUrl],
          },
          unit_amount: orderItem.priceInCents,
        },
        quantity: orderItem.quantity,
      };
    }),
  });
  return checkoutSession;
  */

  // Development mock implementation:
  // Update order status to "paid" directly
  await db
    .update(orderTable)
    .set({
      status: "paid",
    })
    .where(eq(orderTable.id, orderId));

  // Return a mock session object with the success URL
  return {
    url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/checkout/success`,
    // Add any other properties needed by your application
  };
};
