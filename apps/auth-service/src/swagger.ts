// apps/auth-service/src/swagger.ts
import { OpenAPIV3 } from "openapi-types";

export const swaggerDocument: OpenAPIV3.Document = {
  openapi: "3.0.0",
  info: {
    title: "Auth Service API",
    version: "1.0.0",
    description: "API documentation for the Auth Service",
  },
  servers: [
    {
      url: "http://localhost:6001/api",
      description: "Local Dev Server",
    },
  ],
  paths: {
    "/register": {
      post: {
        tags: ["Auth"],
        summary: "Register a new user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  email: { type: "string" },
                  password: { type: "string" },
                },
                required: ["name", "email", "password"],
              },
            },
          },
        },
        responses: {
          "200": {
            description: "OTP sent successfully",
          },
          "400": {
            description: "Validation error",
          },
          "409": {
            description: "User already exists",
          },
        },
      },
    },
  },
};
