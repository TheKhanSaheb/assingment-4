import type { Request, Response } from "express";

import { adminService } from "./admin.service";

import { catchAsync } from "../../utils/catch-async";
import { sendResponse } from "../../utils/send-response";
import { AppError } from "../../utils/app-error";

const getUsers = catchAsync(
  async (_req: Request, res: Response) => {
    const result = await adminService.getUsers();

    sendResponse(res, {
      message: "Users retrieved successfully",
      data: result,
    });
  }
);

const updateUserStatus = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    if (typeof id !== "string") {
      throw new AppError(400, "Invalid user ID");
    }

    const status = req.body.status;

    if (status !== "ACTIVE" && status !== "BANNED") {
      throw new AppError(
        400,
        "Status must be ACTIVE or BANNED"
      );
    }

    const result = await adminService.updateUserStatus(
      id,
      status
    );

    sendResponse(res, {
      message: "User status updated successfully",
      data: result,
    });
  }
);

const getProperties = catchAsync(
  async (_req: Request, res: Response) => {
    const result = await adminService.getProperties();

    sendResponse(res, {
      message: "Properties retrieved successfully",
      data: result,
    });
  }
);

const getRentals = catchAsync(
  async (_req: Request, res: Response) => {
    const result = await adminService.getRentals();

    sendResponse(res, {
      message: "Rentals retrieved successfully",
      data: result,
    });
  }
);

export const adminController = {
  getUsers,
  updateUserStatus,
  getProperties,
  getRentals,
};