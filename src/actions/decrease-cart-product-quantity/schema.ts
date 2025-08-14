import z from "zod";

export const decreaseCartProductQuantitySchema = z.object({
  cartItemId: z.uuid(),
});

export type decreaseCartProductQuantity = z.infer<
  typeof decreaseCartProductQuantitySchema
>;
