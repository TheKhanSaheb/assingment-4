import type { Request, Response } from "express";

import { paymentService } from "./payment.service";
import { paymentValidation } from "./payment.validation";

import { catchAsync } from "../../utils/catch-async";
import { sendResponse } from "../../utils/send-response";
import { AppError } from "../../utils/app-error";

const createPayment = catchAsync(
  async (req: Request, res: Response) => {
    const data = paymentValidation.createPayment.parse({
      body: req.body,
    });

    const result = await paymentService.createPayment(
      req.user!.id,
      data.body
    );

    sendResponse(res, {
      message: "Payment created successfully",
      data: result,
    });
  }
);

const confirmPayment = catchAsync(
  async (req: Request, res: Response) => {
    const data = paymentValidation.confirmPayment.parse({
      body: req.body,
    });

    const result = await paymentService.confirmPayment(
      req.user!.id,
      data.body.transactionId
    );

    sendResponse(res, {
      message: "Payment confirmed successfully",
      data: result,
    });
  }
);

const getMyPayments = catchAsync(
  async (req: Request, res: Response) => {
    const result = await paymentService.getMyPayments(
      req.user!.id
    );

    sendResponse(res, {
      message: "Payments retrieved successfully",
      data: result,
    });
  }
);

const getPaymentById = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    if (typeof id !== "string") {
      throw new AppError(400, "Invalid payment ID");
    }

    const result = await paymentService.getPaymentById(
      id,
      req.user!.id
    );

    sendResponse(res, {
      message: "Payment retrieved successfully",
      data: result,
    });
  }
);

export const paymentController = {
  createPayment,
  confirmPayment,
  getMyPayments,
  getPaymentById,
};