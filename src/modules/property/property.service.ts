
import prisma from "../../lib/prisma";

const createProperty = async (userId: string, data: any) => {
  return await prisma.property.create({
    data: {
      ...data,
      landlordId: userId,
    },
  });
};

const getAllProperties = async (query: any) => {
  const { location, minPrice, maxPrice, categoryId, amenity } = query;

  return await prisma.property.findMany({
    where: {
      status: "AVAILABLE",

      ...(location && {
        location: {
          contains: location,
          mode: "insensitive",
        },
      }),

      ...(categoryId && {
        categoryId,
      }),

      ...(minPrice || maxPrice
        ? {
            price: {
              ...(minPrice && { gte: Number(minPrice) }),
              ...(maxPrice && { lte: Number(maxPrice) }),
            },
          }
        : {}),

      ...(amenity && {
        amenities: {
          has: amenity,
        },
      }),
    },

    include: {
      category: true,
      landlord: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });
};

const getPropertyById = async (id: string) => {
  return await prisma.property.findUnique({
    where: {
      id,
    },
    include: {
      category: true,
      landlord: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
};

const updateProperty = async (
  propertyId: string,
  landlordId: string,
  data: any
) => {
  const property = await prisma.property.findUnique({
    where: {
      id: propertyId,
    },
  });

  if (!property) {
    throw new Error("Property not found");
  }

  if (property.landlordId !== landlordId) {
    throw new Error("You are not allowed to update this property");
  }

  return await prisma.property.update({
    where: {
      id: propertyId,
    },
    data,
  });
};

const deleteProperty = async (
  propertyId: string,
  landlordId: string
) => {
  const property = await prisma.property.findUnique({
    where: {
      id: propertyId,
    },
  });

  if (!property) {
    throw new Error("Property not found");
  }

  if (property.landlordId !== landlordId) {
    throw new Error("You are not allowed to delete this property");
  }

  return await prisma.property.delete({
    where: {
      id: propertyId,
    },
  });
};

export const propertyService = {
  createProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
};

