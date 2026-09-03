import prisma from "../../lib/prisma";

const createPayment = async (
  tenantId: string,
  data: {
    rentalRequestId: string;
    amount: number;
    method: "CARD" | "MOBILE_BANKING" | "BANK" | "OTHER";
    provider: "STRIPE" | "SSLCOMMERZ";
  }
) => {
  const rental = await prisma.rentalRequest.findUnique({
    where: { id: data.rentalRequestId },
  });

  if (!rental) {
    throw new Error("Rental request not found");
  }

  if (rental.tenantId !== tenantId) {
    throw new Error("You are not allowed to pay for this rental");
  }

  if (rental.status !== "APPROVED") {
    throw new Error("Rental request must be approved before payment");
  }

  const transactionId = `TXN-${Date.now()}`;

  return await prisma.payment.create({
    data: {
      transactionId,
      rentalRequestId: data.rentalRequestId,
      amount: data.amount,
      method: data.method,
      provider: data.provider,
    },
  });
};

const confirmPayment = async (
  tenantId: string,
  transactionId: string
) => {
  const payment = await prisma.payment.findUnique({
    where: { transactionId },
    include: {
      rentalRequest: true,
    },
  });

  if (!payment) {
    throw new Error("Payment not found");
  }

  if (payment.rentalRequest.tenantId !== tenantId) {
    throw new Error("You are not allowed to confirm this payment");
  }

  return await prisma.payment.update({
    where: { transactionId },
    data: {
      status: "COMPLETED",
      paidAt: new Date(),
    },
  });
};

const getMyPayments = async (tenantId: string) => {
  return await prisma.payment.findMany({
    where: {
      rentalRequest: {
        tenantId,
      },
    },
    include: {
      rentalRequest: {
        include: {
          property: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const getPaymentById = async (
  paymentId: string,
  tenantId: string
) => {
  const payment = await prisma.payment.findUnique({
    where: { id: paymentId },
    include: {
      rentalRequest: {
        include: {
          property: true,
        },
      },
    },
  });

  if (!payment) {
    throw new Error("Payment not found");
  }

  if (payment.rentalRequest.tenantId !== tenantId) {
    throw new Error("You are not allowed to view this payment");
  }

  return payment;
};

export const paymentService = {
  createPayment,
  confirmPayment,
  getMyPayments,
  getPaymentById,
};