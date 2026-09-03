import prisma from "../../lib/prisma";

const createRentalRequest = async (
  tenantId: string,
data: {
  propertyId: string;
  message?: string | undefined;
}
) => {
  const property = await prisma.property.findUnique({
    where: {
      id: data.propertyId,
    },
  });

  if (!property) {
    throw new Error("Property not found");
  }

  if (property.status !== "AVAILABLE") {
    throw new Error("Property is not available");
  }

  return await prisma.rentalRequest.create({
   data: {
  tenantId,
  propertyId: data.propertyId,
  ...(data.message !== undefined && {
    message: data.message,
  }),
},
    include: {
      property: true,
    },
  });
};

const getMyRentals = async (tenantId: string) => {
  return await prisma.rentalRequest.findMany({
    where: {
      tenantId,
    },
    include: {
      property: true,
      payments: true,
      review: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const getRentalById = async (
  rentalId: string,
  tenantId: string
) => {
  const rental = await prisma.rentalRequest.findUnique({
    where: {
      id: rentalId,
    },
    include: {
      property: true,
      payments: true,
      review: true,
    },
  });

  if (!rental) {
    throw new Error("Rental request not found");
  }

  if (rental.tenantId !== tenantId) {
    throw new Error("You are not allowed to view this rental");
  }

  return rental;
};


const getLandlordRequests = async (landlordId: string) => {
  return await prisma.rentalRequest.findMany({
    where: {
      property: {
        landlordId,
      },
    },
    include: {
      property: true,
      tenant: {
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

const updateRentalRequestStatus = async (
  rentalId: string,
  landlordId: string,
  status: "APPROVED" | "REJECTED" | "COMPLETED"
) => {
  const rental = await prisma.rentalRequest.findUnique({
    where: {
      id: rentalId,
    },
    include: {
      property: true,
    },
  });

  if (!rental) {
    throw new Error("Rental request not found");
  }

  if (rental.property.landlordId !== landlordId) {
    throw new Error(
      "You are not allowed to update this rental request"
    );
  }

  return await prisma.rentalRequest.update({
    where: {
      id: rentalId,
    },
    data: {
      status,
    },
  });
};

export const rentalService = {
  createRentalRequest,
  getMyRentals,
  getRentalById,
  getLandlordRequests,
  updateRentalRequestStatus,
};