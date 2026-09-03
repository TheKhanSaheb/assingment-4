import "dotenv/config";
import { env } from "node:process";

const config = {
  NODE_ENV: env.NODE_ENV,
  PORT: env.PORT,
  DATABASE_URL:process.env.DATABASE_URL,
  JWT_REFRESH_SECRET:process.env.JWT_REFRESH_SECRET as string,
  JWT_ACCESS_SECRET:process.env.JWT_ACCESS_SECRET as string

};

export default config;