import { Router, type IRouter } from "express";
import auth from "../../middleware/auth";
import { reviewController } from "./review.controller";

const reviewRouter: IRouter = Router();

reviewRouter.post(
  "/",
  auth("TENANT"),
  reviewController.createReview
);

export default reviewRouter;