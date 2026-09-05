import { Router, type IRouter } from "express";

import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validate-request";
import { paymentController } from "./payment.controller";
import { paymentValidation } from "./payment.validation";

const paymentRouter: IRouter = Router();

paymentRouter.post(
  "/create",
  auth("TENANT"),
  validateRequest(paymentValidation.createPayment),
  paymentController.createPayment
);

paymentRouter.post(
  "/confirm",
  auth("TENANT"),
  validateRequest(paymentValidation.confirmPayment),
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