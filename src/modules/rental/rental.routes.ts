import { Router, type IRouter } from "express";

import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validate-request";
import { rentalController } from "./rental.controller";
import { rentalValidation } from "./rental.validation";

const rentalRouter: IRouter = Router();

rentalRouter.post(
  "/",
  auth("TENANT"),
  validateRequest(rentalValidation.createRentalRequest),
  rentalController.createRentalRequest
);

rentalRouter.get(
  "/",
  auth("TENANT"),
  rentalController.getMyRentals
);

rentalRouter.get(
  "/:id",
  auth("TENANT"),
  rentalController.getRentalById
);

export default rentalRouter;