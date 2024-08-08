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
};