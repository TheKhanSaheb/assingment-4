import { Router, type IRouter } from "express";

import auth from "../../middleware/auth";
import { rentalController } from "./rental.controller";

const landlordRentalRouter: IRouter = Router();

landlordRentalRouter.get(
  "/",
  auth("LANDLORD"),
  rentalController.getLandlordRequests
);

landlordRentalRouter.patch(
  "/:id",
  auth("LANDLORD"),
  rentalController.updateRentalRequestStatus
);

export default landlordRentalRouter;