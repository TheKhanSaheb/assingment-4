import { Router, type IRouter } from "express";
import { authController } from "./auth.controller";

const authRouter: IRouter = Router();

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);

export default authRouter;