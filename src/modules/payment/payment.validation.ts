import { z } from "zod";

const createPayment = z.object({
  body: z.object({
    rentalRequestId: z.string().uuid(),
    amount: z.number().positive(),
    method: z.enum([
      "CARD",
      "MOBILE_BANKING",
      "BANK",
      "OTHER",
    ]),
    provider: z.enum([
      "STRIPE",
      "SSLCOMMERZ",
    ]),
  }),
});

const confirmPayment = z.object({
  body: z.object({
    transactionId: z.string().min(1),
    sessionId: z.string().min(1),
  }),
});

export const paymentValidation = {
  createPayment,
  confirmPayment,
};