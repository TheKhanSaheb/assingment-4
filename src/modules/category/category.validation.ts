
import { z } from "zod";

const createCategory = z.object({
  body: z.object({
    name: z.string().min(2, "Category name must be at least 2 characters"),
  }),
});

const updateCategory = z.object({
  params: z.object({
    id: z.string().uuid("Invalid category ID"),
  }),
  body: z.object({
    name: z.string().min(2, "Category name must be at least 2 characters"),
  }),
});

const deleteCategory = z.object({
  params: z.object({
    id: z.string().uuid("Invalid category ID"),
  }),
});

export const categoryValidation = {
  createCategory,
  updateCategory,
  deleteCategory,
};