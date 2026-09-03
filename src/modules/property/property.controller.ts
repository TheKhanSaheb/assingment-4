
import type { Request, Response } from "express";

import { propertyService } from "./property.service";
import { propertyValidation } from "./property.validation";

import { catchAsync } from "../../utils/catch-async";
import { sendResponse } from "../../utils/send-response";
import { AppError } from "../../utils/app-error";

const createProperty = catchAsync(async (req: Request, res: Response) => {
  const data = propertyValidation.createProperty.parse({
    body: req.body,
  });

  const result = await propertyService.createProperty(
    req.user!.id,
    data.body
  );

  sendResponse(res, {
    message: "Property created successfully",
    data: result,
  });
});

const getAllProperties = catchAsync(async (req: Request, res: Response) => {
  const result = await propertyService.getAllProperties(req.query);

  sendResponse(res, {
    message: "Properties retrieved successfully",
    data: result,
  });
});

const getPropertyById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  if (typeof id !== "string") {
    throw new AppError(400, "Invalid property ID");
  }

  const result = await propertyService.getPropertyById(id);

  if (!result) {
    throw new AppError(404, "Property not found");
  }

  sendResponse(res, {
    message: "Property retrieved successfully",
    data: result,
  });
});

const updateProperty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  if (typeof id !== "string") {
    throw new AppError(400, "Invalid property ID");
  }

  const data = propertyValidation.updateProperty.parse({
    body: req.body,
  });

  const result = await propertyService.updateProperty(
    id,
    req.user!.id,
    data.body
  );

  sendResponse(res, {
    message: "Property updated successfully",
    data: result,
  });
});

const deleteProperty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  if (typeof id !== "string") {
    throw new AppError(400, "Invalid property ID");
  }

  const result = await propertyService.deleteProperty(
    id,
    req.user!.id
  );

  sendResponse(res, {
    message: "Property deleted successfully",
    data: result,
  });
});

export const propertyController = {
  createProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
};

