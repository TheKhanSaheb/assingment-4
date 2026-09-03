import { Router, type IRouter } from "express";

import auth from "../../middleware/auth";
import { propertyController } from "./property.controller";

const landlordPropertyRouter: IRouter = Router();

landlordPropertyRouter.post(
  "/",
  auth("LANDLORD"),
  propertyController.createProperty
);

landlordPropertyRouter.put(
  "/:id",
  auth("LANDLORD"),
  propertyController.updateProperty
);

landlordPropertyRouter.delete(
  "/:id",
  auth("LANDLORD"),
  propertyController.deleteProperty
);

export default landlordPropertyRouter;