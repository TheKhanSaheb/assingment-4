import type { Request, Response } from "express";

import { rentalService } from "./rental.service";
import { rentalValidation } from "./rental.validation";

import { catchAsync } from "../../utils/catch-async";
import { sendResponse } from "../../utils/send-response";
import { AppError } from "../../utils/app-error";

const createRentalRequest = catchAsync(
  async (req: Request, res: Response) => {
    const data = rentalValidation.createRentalRequest.parse({
      body: req.body,
    });

    const result = await rentalService.createRentalRequest(
      req.user!.id,
      data.body
    );

    sendResponse(res, {
      message: "Rental request created successfully",
      data: result,
    });
  }
);

const getMyRentals = catchAsync(
  async (req: Request, res: Response) => {
    const result = await rentalService.getMyRentals(
      req.user!.id
    );

    sendResponse(res, {
      message: "Rentals retrieved successfully",
      data: result,
    });
  }
);

const getRentalById = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    if (typeof id !== "string") {
      throw new AppError(400, "Invalid rental ID");
    }

    const result = await rentalService.getRentalById(
      id,
      req.user!.id
    );

    sendResponse(res, {
      message: "Rental retrieved successfully",
      data: result,
    });
  }
);

const getLandlordRequests = catchAsync(
  async (req: Request, res: Response) => {
    const result = await rentalService.getLandlordRequests(
      req.user!.id
    );

    sendResponse(res, {
      message: "Rental requests retrieved successfully",
      data: result,
    });
  }
);

const updateRentalRequestStatus = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    if (typeof id !== "string") {
      throw new AppError(400, "Invalid rental ID");
    }

    const status = req.body.status;

    if (
  status !== "APPROVED" &&
  status !== "REJECTED" &&
  status !== "COMPLETED"
) {
  throw new AppError(
    400,
    "Status must be APPROVED, REJECTED or COMPLETED"
  );
}

    const result = await rentalService.updateRentalRequestStatus(
      id,
      req.user!.id,
      status
    );

    sendResponse(res, {
      message: "Rental request status updated successfully",
      data: result,
    });
  }
);

export const rentalController = {
  createRentalRequest,
  getMyRentals,
  getRentalById,
  getLandlordRequests,
  updateRentalRequestStatus,
};