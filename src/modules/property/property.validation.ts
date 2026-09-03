
import { z } from "zod";

const createProperty = z.object({
  body: z.object({
    categoryId: z.string().uuid(),
    title: z.string().min(1),
    description: z.string().min(1),
    location: z.string().min(1),
    price: z.number().positive(),
    bedrooms: z.number().int().positive().optional(),
    bathrooms: z.number().int().positive().optional(),
    amenities: z.array(z.string()).optional(),
    images: z.array(z.string()).optional(),
  }),
});

const updateProperty = z.object({
  body: z.object({
    categoryId: z.string().uuid().optional(),
    title: z.string().min(1).optional(),
    description: z.string().min(1).optional(),
    location: z.string().min(1).optional(),
    price: z.number().positive().optional(),
    bedrooms: z.number().int().positive().optional(),
    bathrooms: z.number().int().positive().optional(),
    amenities: z.array(z.string()).optional(),
    images: z.array(z.string()).optional(),
    status: z.enum(["AVAILABLE", "UNAVAILABLE"]).optional(),
  }),
});

export const propertyValidation = {
  createProperty,
  updateProperty,
};

