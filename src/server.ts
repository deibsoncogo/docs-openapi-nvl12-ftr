import fastifyCors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import scalarUI from "@scalar/fastify-api-reference";
import fastify from "fastify";
import { createUserRoute } from "./routes/create-user-route.ts";
import { getUsersRoute } from "./routes/get-users-route.ts";

const app = fastify()

app.register(fastifyCors, {
  origin: "*"
})

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Docs Open API NVL 12 FTR",
      version: "1.0.0",
    },

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        }
      }
    }
  }
})

app.register(createUserRoute)
app.register(getUsersRoute)

app.get("/openapi.json", () => app.swagger())

app.register(scalarUI, {
  routePrefix: "/docs",
  configuration: {
    layout: "modern"
  }
})

app.listen({ port: 3333 }).then(() => {
  console.log("HTTP server running!");
})
