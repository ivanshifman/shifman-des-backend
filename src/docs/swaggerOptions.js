import swaggerJSDoc from "swagger-jsdoc";
import { __dirname } from "../utils.js";

const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "API Ecommerce",
      description: "API documentation",
    },
  },
  apis: [`${__dirname}/docs/**/*.yaml`],
};

export const specs = swaggerJSDoc(swaggerOptions);
