import prisma from "../../lib/prisma";
import stripe from "../../lib/stripe";

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

  if (data.provider !== "STRIPE") {
    throw new Error("Only Stripe payment is currently supported");
  }

  const transactionId = `TXN-${Date.now()}`;

  const payment = await prisma.payment.create({
    data: {
      transactionId,
      rentalRequestId: data.rentalRequestId,
      amount: data.amount,
      method: data.method,
      provider: "STRIPE",
    },
  });

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "bdt",
          product_data: {
            name: "RentNest Rental Payment",
          },
          unit_amount: Math.round(data.amount * 100),
        },
        quantity: 1,
      },
    ],
    metadata: {
      paymentId: payment.id,
      transactionId,
      rentalRequestId: data.rentalRequestId,
    },
    success_url: "http://localhost:3000/payment/success",
    cancel_url: "http://localhost:3000/payment/cancel",
  });

  return {
    payment,
    checkoutUrl: session.url,
  };
};
const confirmPayment = async (
  tenantId: string,
  transactionId: string,
  sessionId: string
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

  const session = await stripe.checkout.sessions.retrieve(sessionId);

  if (session.payment_status !== "paid") {
    throw new Error("Payment has not been completed");
  }

  if (session.metadata?.paymentId !== payment.id) {
    throw new Error("Invalid payment session");
  }

  const updatedPayment = await prisma.payment.update({
    where: { transactionId },
    data: {
      status: "COMPLETED",
      paidAt: new Date(),
    },
  });

  await prisma.rentalRequest.update({
    where: { id: payment.rentalRequestId },
    data: {
      status: "ACTIVE",
    },
  });

  return updatedPayment;
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