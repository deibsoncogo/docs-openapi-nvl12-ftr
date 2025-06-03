import { FastifyPluginAsync } from "fastify";

export const getUsersRoute: FastifyPluginAsync = async (app) => {
  app.get("/users", {
    schema: {
      summary: "Get all users",
      querystring: {
        type: "object",
        properties: {
          page: {
            type: "integer",
            minimum: 1,
            default: 1,
          }
        }
      },
      response: {
        200: {
          description: "A list of users",
          type: "object",
          properties: {
            data: {
              type: "array",
              items: {
                type: "object",
                required: ["id", "name", "email"],
                properties: {
                  id: { type: "string", format: "uuid" },
                  name: { type: ["string", "null"], maxLength: 100 },
                  email: { type: "string", format: "email" }
                }
              }
            }
          }
        }
      }
    }
  }, () => {
    return { data: [] }
  })
}
