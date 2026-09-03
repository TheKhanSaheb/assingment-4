import { Router, type IRouter } from "express";

import auth from "../../middleware/auth";
import { adminController } from "./admin.controller";

const adminRouter: IRouter = Router();

adminRouter.get(
  "/users",
  auth("ADMIN"),
  adminController.getUsers
);

adminRouter.patch(
  "/users/:id",
  auth("ADMIN"),
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