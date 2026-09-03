import type { Request, Response } from "express";
import { reviewService } from "./review.service";

const createReview = async (req: Request, res: Response) => {
  const tenantId = req.user!.id;

  const result = await reviewService.createReview(
    tenantId,
    req.body
  );

  res.status(201).json({
    message: "Review created successfully",
    data: result,
  });
};

export const reviewController = {
  createReview,
};