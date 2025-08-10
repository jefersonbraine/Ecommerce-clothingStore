import { z } from "zod";

export const addProductToCartSchema = z.object({
  productVariantId: z.uuid(),
  quantity: z.number().min(1),
});

export type addProductToCartSchema = z.infer<typeof addProductToCartSchema>;