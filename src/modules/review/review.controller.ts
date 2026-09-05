import type { Request, Response } from "express";

import { reviewService } from "./review.service";
import { reviewValidation } from "./review.validation";

import { catchAsync } from "../../utils/catch-async";
import { sendResponse } from "../../utils/send-response";

const createReview = catchAsync(
  async (req: Request, res: Response) => {
    const data = reviewValidation.createReview.parse({
      body: req.body,
    });

    const tenantId = req.user!.id;

    const result = await reviewService.createReview(
      tenantId,
      data.body
    );

    sendResponse(res, {
      message: "Review created successfully",
      data: result,
    });
  }
);

export const reviewController = {
  createReview,
};