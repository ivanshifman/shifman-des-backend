import dotenv from "dotenv";
import { Command } from "commander";

const program = new Command();

program.option("-e, --env <string>", "Server mode", "dev");

program.parse();

const environment = program.opts().env;

dotenv.config({
  path: `.${environment}.env`,
});

export const config = {
  MONGO_URL: process.env.MONGO_URL,
  PORT: process.env.PORT,
  SECRET_KEY_JWT: process.env.SECRET_KEY_JWT,
  MAILER: {
    HOST: process.env.MAILER_HOST,
    PORT: process.env.MAILER_PORT,
    USERNAME: process.env.MAILER_USERNAME,
    PASSWORD: process.env.MAILER_PASSWORD,
  },
  SMS: {
    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
    TWILIO_PHONE_NUMBER: process.env.TWILIO_PHONE_NUMBER,
  },
};
