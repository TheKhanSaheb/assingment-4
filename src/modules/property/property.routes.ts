import { Router, type IRouter } from "express";

import auth from "../../middleware/auth";
import { propertyController } from "./property.controller";

const propertyRouter: IRouter = Router();

// Public
propertyRouter.get("/", propertyController.getAllProperties);
propertyRouter.get("/:id", propertyController.getPropertyById);

export default propertyRouter;