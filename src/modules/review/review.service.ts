import prisma from "../../lib/prisma";

const createReview = async (
  tenantId: string,
  data: {
    propertyId: string;
    rentalRequestId: string;
    rating: number;
    comment?: string;
  }
) => {
  const rental = await prisma.rentalRequest.findUnique({
    where: {
      id: data.rentalRequestId,
    },
  });

  if (!rental) {
    throw new Error("Rental request not found");
  }

  if (rental.tenantId !== tenantId) {
    throw new Error("You are not allowed to review this rental");
  }

  if (rental.propertyId !== data.propertyId) {
    throw new Error("Property does not match the rental request");
  }

  if (rental.status !== "COMPLETED") {
    throw new Error("Review is allowed only after rental is completed");
  }

  const existingReview = await prisma.review.findUnique({
    where: {
      rentalRequestId: data.rentalRequestId,
    },
  });

  if (existingReview) {
    throw new Error("You have already reviewed this rental");
  }

  return await prisma.review.create({
    data: {
      tenantId,
      propertyId: data.propertyId,
      rentalRequestId: data.rentalRequestId,
      rating: data.rating,
      comment: data.comment ?? null,
    },
  });
};

export const reviewService = {
  createReview,
};