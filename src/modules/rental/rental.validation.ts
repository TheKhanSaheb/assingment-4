import { z } from "zod";

const createRentalRequest = z.object({
  body: z.object({
    propertyId: z.string().uuid(),
    message: z.string().optional(),
  }),
});

export const rentalValidation = {
  createRentalRequest,
};