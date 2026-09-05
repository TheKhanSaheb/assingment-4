import { Router, type IRouter } from "express";

import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validate-request";

import { categoryController } from "./category.controller";
import { categoryValidation } from "./category.validation";

const categoryRouter: IRouter = Router();

categoryRouter.post(
  "/",
  auth("ADMIN"),
  validateRequest(categoryValidation.createCategory),
  categoryController.createCategory
);

categoryRouter.patch(
  "/:id",
  auth("ADMIN"),
  validateRequest(categoryValidation.updateCategory),
  categoryController.updateCategory
);

categoryRouter.delete(
  "/:id",
  auth("ADMIN"),
  validateRequest(categoryValidation.deleteCategory),
  categoryController.deleteCategory
);

export default categoryRouter;