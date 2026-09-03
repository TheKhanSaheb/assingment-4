import prisma from "../../lib/prisma";

const getUsers = async () => {
  return await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const updateUserStatus = async (
  userId: string,
  status: "ACTIVE" | "BANNED"
) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      status,
    },
  });
};

const getProperties = async () => {
  return await prisma.property.findMany({
    include: {
      landlord: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const getRentals = async () => {
  return await prisma.rentalRequest.findMany({
    include: {
      tenant: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      property: {
        include: {
          landlord: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      },
      payments: true,
      review: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const adminService = {
  getUsers,
  updateUserStatus,
  getProperties,
  getRentals,
};