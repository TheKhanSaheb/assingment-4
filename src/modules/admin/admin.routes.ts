import { Router, type IRouter } from "express";

import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validate-request";
import { adminController } from "./admin.controller";
import { adminValidation } from "./admin.validation";

const adminRouter: IRouter = Router();

adminRouter.get(
  "/users",
  auth("ADMIN"),
  adminController.getUsers
);

adminRouter.patch(
  "/users/:id",
  auth("ADMIN"),
  validateRequest(adminValidation.updateUserStatus),
  adminController.updateUserStatus
);

adminRouter.get(
  "/properties",
  auth("ADMIN"),
  adminController.getProperties
);

adminRouter.get(
  "/rentals",
  auth("ADMIN"),
  adminController.getRentals
);

export default adminRouter;