import { z } from "zod";

const register = z.object({
  body: z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(6),
    role: z.enum(["TENANT", "LANDLORD"]),
  }),
});

const login = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(1),
  }),
});
const updateProfile = z.object({
  body: z.object({
    name: z.string().min(2).optional(),
    email: z.string().email().optional(),
  }),
});

export const authValidation = {
  register,
  login,
   updateProfile,
};