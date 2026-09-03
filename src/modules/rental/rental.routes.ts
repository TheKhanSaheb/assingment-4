import { Router, type IRouter } from "express";

import auth from "../../middleware/auth";
import { rentalController } from "./rental.controller";

const rentalRouter: IRouter = Router();

rentalRouter.post(
  "/",
  auth("TENANT"),
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