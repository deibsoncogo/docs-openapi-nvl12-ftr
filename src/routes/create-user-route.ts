import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const createUserRoute: FastifyPluginAsyncZod = async (app) => {
  app.post("/users", {
    schema: {
      summary: "Create an users",
      security: [{ bearerAuth: [] }],
      body: z.object({
        name: z.string().max(100).nullable(),
        email: z.string().email(),
      }),
      response: {
        201: z.object({
          userId: z.string().uuid().describe("New user ID"),
        }).describe("User created"),

        400: z.object({
          errors: z.array(
            z.object({
              name: z.string(),
              error: z.string(),
            })
          )
        }).describe("Validation failed"),

        409: z.object({
          message: z.string(),
        }).describe("User e-mail already exists"),
      },
    },
  }, () => {
    return { userId: "f8b1c2d3-4e5f-6a7b-8c9d-e0f1g2h3i4j5" }
  })
}
