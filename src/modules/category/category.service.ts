import prisma from "../../lib/prisma";

const createCategory = async (name: string) => {
  return await prisma.category.create({
    data: {
      name,
    },
  });
};

const updateCategory = async (id: string, name: string) => {
  return await prisma.category.update({
    where: {
      id,
    },
    data: {
      name,
    },
  });
};

const deleteCategory = async (id: string) => {
  return await prisma.category.delete({
    where: {
      id,
    },
  });
};

export const categoryService = {
  createCategory,
  updateCategory,
  deleteCategory,
};