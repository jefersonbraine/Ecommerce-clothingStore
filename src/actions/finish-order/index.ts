"use server";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";

import { db } from "@/db";
import {
  cartItemTable,
  cartTable,
  orderItemTable,
  orderTable,
  shippingAddressTable,
} from "@/db/schema";
import { auth } from "@/lib/auth";

export const finishOrder = async () => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session) {
      throw new Error("Unauthorized");
    }

    // First, find the cart
    const cart = await db.query.cartTable.findFirst({
      where: eq(cartTable.userId, session.user.id),
      with: {
        items: {
          with: {
            productVariant: true,
          },
        },
      },
    });

    if (!cart) {
      // Create a new cart for the user
      await db.insert(cartTable).values({
        userId: session.user.id,
      });

      throw new Error(
        "Cart not found. A new cart has been created for you. Please add items to your cart before checking out.",
      );
    }

    // Find the shipping address separately to avoid relation issues
    const shippingAddress = await db.query.shippingAddressTable.findFirst({
      where: eq(shippingAddressTable.id, cart.shippingAddressId || ""),
    });

    if (!shippingAddress) {
      throw new Error("Shipping address not found");
    }

    // Calculate total price
    const totalPriceInCents = cart.items.reduce(
      (acc, item) => acc + item.productVariant.priceInCents * item.quantity,
      0,
    );

    // Create the order
    let orderId: string | undefined;

    await db.transaction(async (tx) => {
      // Create the order record
      const [order] = await tx
        .insert(orderTable)
        .values({
          email: shippingAddress.email,
          zipCode: shippingAddress.zipCode,
          country: shippingAddress.country,
          phone: shippingAddress.phone,
          cpfOrCnpj: shippingAddress.cpfOrCnpj,
          city: shippingAddress.city,
          complement: shippingAddress.complement,
          neighborhood: shippingAddress.neighborhood,
          number: shippingAddress.number,
          recipientName: shippingAddress.recipientName,
          state: shippingAddress.state,
          street: shippingAddress.street,
          userId: session.user.id,
          totalPriceInCents,
          shippingAddressId: shippingAddress.id,
          status: "pending",
        })
        .returning();

      if (!order) {
        throw new Error("Failed to create order");
      }

      orderId = order.id;

      // Create order items
      const orderItemsPayload: Array<typeof orderItemTable.$inferInsert> =
        cart.items.map((item) => ({
          orderId: order.id,
          productVariantId: item.productVariant.id,
          quantity: item.quantity,
          priceInCents: item.productVariant.priceInCents,
        }));

      // Only insert order items if there are items in the cart
      if (orderItemsPayload.length > 0) {
        await tx.insert(orderItemTable).values(orderItemsPayload);
      }

      // Clean up the cart and cart items
      await tx.delete(cartItemTable).where(eq(cartItemTable.cartId, cart.id));
      await tx.delete(cartTable).where(eq(cartTable.id, cart.id));
    });

    if (!orderId) {
      throw new Error("Failed to create order");
    }

    return { orderId };
  } catch (error) {
    // Log the error for debugging
    console.error("Error in finishOrder:", error);
    throw error;
  }
};
