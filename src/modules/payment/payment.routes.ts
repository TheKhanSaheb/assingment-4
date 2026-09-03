import { Router, type IRouter } from "express";
import auth from "../../middleware/auth";
import { paymentController } from "./payment.controller";

const paymentRouter: IRouter = Router();

paymentRouter.post(
  "/create",
  auth("TENANT"),
  paymentController.createPayment
);

paymentRouter.post(
  "/confirm",
  auth("TENANT"),
  paymentController.confirmPayment
);

paymentRouter.get(
  "/",
  auth("TENANT"),
  paymentController.getMyPayments
);

paymentRouter.get(
  "/:id",
  auth("TENANT"),
  paymentController.getPaymentById
);

export default paymentRouter;