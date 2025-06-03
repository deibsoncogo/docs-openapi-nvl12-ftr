import type { FastifyPluginAsync } from "fastify";

export const createUserRoute: FastifyPluginAsync = async (app) => {
  app.post("/users", {
    schema: {
      summary: "Create an users",
      security: [{ bearerAuth: [] }],
      body: {
        type: "object",
        examples: [{
          name: "John Doe",
          email: "john.doe@example.com"
        }],
        properties: {
          name: {
            type: ["string", "null"],
            maxLength: 100
          },
          email: {
            type: "string",
            format: "email"
          }
        }
      },
      response: {
        201: {
          description: "User created",
          type: "object",
          properties: {
            userId: {
              type: "string",
              format: "uuid",
              description: "New user ID"
            }
          }
        }
      }
    }
  }, () => {
    return { userId: 123 }
  })
}
