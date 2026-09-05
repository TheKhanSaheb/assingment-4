import { Router, type IRouter } from "express";

import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validate-request";
import { propertyController } from "./property.controller";
import { propertyValidation } from "./property.validation";

const landlordPropertyRouter: IRouter = Router();

landlordPropertyRouter.post(
  "/",
  auth("LANDLORD"),
  validateRequest(propertyValidation.createProperty),
  propertyController.createProperty
);

landlordPropertyRouter.put(
  "/:id",
  auth("LANDLORD"),
  validateRequest(propertyValidation.updateProperty),
  propertyController.updateProperty
);

landlordPropertyRouter.delete(
  "/:id",
  auth("LANDLORD"),
  propertyController.deleteProperty
);

export default landlordPropertyRouter;