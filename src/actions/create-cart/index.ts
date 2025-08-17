"use server";

import { headers } from "next/headers";

import { db } from "@/db";
import { cartTable } from "@/db/schema";
import { auth } from "@/lib/auth";

export const createNewCart = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  // Check if cart already exists
  const existingCart = await db.query.cartTable.findFirst({
    where: (cart, { eq }) => eq(cart.userId, session.user.id),
  });

  if (existingCart) {
    return {
      success: true,
      message: "Cart already exists",
      cartId: existingCart.id,
    };
  }

  // Create a new cart
  const [newCart] = await db
    .insert(cartTable)
    .values({
      userId: session.user.id,
    })
    .returning();

  return {
    success: true,
    message: "Cart created successfully",
    cartId: newCart.id,
  };
};
