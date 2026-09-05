import { z } from "zod";

const createRentalRequest = z.object({
  body: z.object({
    propertyId: z.string().uuid(),
    message: z.string().optional(),
  }),
});

const updateRentalRequestStatus = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
  body: z.object({
    status: z.enum(["APPROVED", "REJECTED", "COMPLETED"]),
  }),
});

export const rentalValidation = {
  createRentalRequest,
  updateRentalRequestStatus,
};