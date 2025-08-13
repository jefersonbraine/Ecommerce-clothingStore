import z from "zod";

export const removeCartProductSchema = z.object({
  cartItemId: z.uuid(),
});

export type removeCartProductSchema = z.infer<typeof removeCartProductSchema>;
