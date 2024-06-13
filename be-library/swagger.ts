import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Library API",
      version: "1.0.0",
      description: "API documentation for the library",
    },
    servers: [
      {
        url: "http://localhost:4000",
        description: "Development server",
      },
    ],
  },

  apis: ["./src/routes/*.ts", "./src/controllers/*.ts"],
};

const specs = swaggerJSDoc(options);

export const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};
