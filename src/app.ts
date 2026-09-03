import express, { type Application } from "express";

import { notFound } from "./middleware/not-found";
import { globalErrorHandler } from "./middleware/global-error";

import propertyRouter from "./modules/property/property.routes";
import landlordPropertyRouter from "./modules/property/landlord-property.routes";
import rentalRouter from "./modules/rental/rental.routes";
import landlordRentalRouter from "./modules/rental/landlord-rental.routes";
import authRouter from "./modules/auth/auth.routes";
import paymentRouter from "./modules/payment/payment.routes";
import reviewRouter from "./modules/review/review.routes";

const app: Application = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("server is running 😒");
});

// Public property routes
app.use("/api/properties", propertyRouter);
app.use("/api/landlord/properties", landlordPropertyRouter);
app.use("/api/rentals", rentalRouter);
app.use("/api/landlord/requests", landlordRentalRouter);
app.use("/api/auth", authRouter);
app.use("/api/payments", paymentRouter);
app.use("/api/reviews", reviewRouter);

// Error handlers MUST be after routes
app.use(notFound);
app.use(globalErrorHandler);

export default app;