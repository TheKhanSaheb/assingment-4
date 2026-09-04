import "dotenv/config";
import { env } from "node:process";

const config = {
  NODE_ENV: env.NODE_ENV,
  PORT: env.PORT,
  DATABASE_URL:process.env.DATABASE_URL,
  JWT_REFRESH_SECRET:process.env.JWT_REFRESH_SECRET as string,
  JWT_ACCESS_SECRET:process.env.JWT_ACCESS_SECRET as string,
  STRIPE_SECRET_KEY:process.env.STRIPE_SECRET_KEY as string,
  STRIPE_PUBLISHABLE_KEY:process.env.IPE_PUBLISHABLE_KEY as string,

};

export default config; 