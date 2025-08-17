"use server";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";

import { db } from "@/db";
import { orderTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import {
  CreateCheckoutSessionSchema,
  createCheckoutSessionSchema,
} from "./schema";

export const createCheckoutSession = async (
  data: CreateCheckoutSessionSchema,
) => {
  try {
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

    // Mock Stripe checkout for development
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
  } catch (error) {
    console.error("Error in createCheckoutSession:", error);
    throw error;
  }
};
