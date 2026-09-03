import { z } from "zod";

const createReview = z.object({
  body: z.object({
    propertyId: z.string().uuid(),
    rentalRequestId: z.string().uuid(),
    rating: z.number().int().min(1).max(5),
    comment: z.string().optional(),
  }),
});

export const reviewValidation = {
  createReview,
};