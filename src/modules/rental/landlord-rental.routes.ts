import { Router, type IRouter } from "express";

import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validate-request";
import { rentalController } from "./rental.controller";
import { rentalValidation } from "./rental.validation";

const landlordRentalRouter: IRouter = Router();

landlordRentalRouter.get(
  "/",
  auth("LANDLORD"),
  rentalController.getLandlordRequests
);

landlordRentalRouter.patch(
  "/:id",
  auth("LANDLORD"),
  validateRequest(rentalValidation.updateRentalRequestStatus),
  rentalController.updateRentalRequestStatus
);

export default landlordRentalRouter;