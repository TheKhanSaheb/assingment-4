import { Router, type IRouter } from "express";
import auth from "../../middleware/auth";
import { categoryController } from "./category.controller";

const categoryRouter: IRouter = Router();

categoryRouter.post(
  "/",
  auth("ADMIN"),
  categoryController.createCategory
);

categoryRouter.patch(
  "/:id",
  auth("ADMIN"),
  categoryController.updateCategory
);

categoryRouter.delete(
  "/:id",
  auth("ADMIN"),
  categoryController.deleteCategory
);

export default categoryRouter;