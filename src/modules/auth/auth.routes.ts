import { Router, type IRouter } from "express";
import { authController } from "./auth.controller";
import auth from "../../middleware/auth";



const authRouter: IRouter = Router();

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.get("/me",auth(),authController.getMe);
authRouter.patch( "/me",auth(),authController.updateProfile
);

export default authRouter;