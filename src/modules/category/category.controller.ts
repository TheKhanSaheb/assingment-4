import type { Request, Response } from "express";
import { catchAsync } from "../../utils/catch-async";
import { sendResponse } from "../../utils/send-response";
import { categoryService } from "./category.service";

const createCategory = catchAsync(
  async (req: Request, res: Response) => {
    const result = await categoryService.createCategory(req.body.name);

    sendResponse(res, {
      message: "Category created successfully",
      data: result,
    });
  }
);

const updateCategory = catchAsync(
  async (req: Request, res: Response) => {
    const result = await categoryService.updateCategory(
      req.params.id as string,
      req.body.name
    );

    sendResponse(res, {
      message: "Category updated successfully",
      data: result,
    });
  }
);

const deleteCategory = catchAsync(
  async (req: Request, res: Response) => {
    const result = await categoryService.deleteCategory(
      req.params.id as string
    );

    sendResponse(res, {
      message: "Category deleted successfully",
      data: result,
    });
  }
);

export const categoryController = {
  createCategory,
  updateCategory,
  deleteCategory,
};