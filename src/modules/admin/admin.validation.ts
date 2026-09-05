import { z } from "zod";

const updateUserStatus = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
  body: z.object({
    status: z.enum(["ACTIVE", "BANNED"]),
  }),
});

export const adminValidation = {
  updateUserStatus,
};