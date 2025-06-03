import fastifyCors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import fastify from "fastify";
import scalarUI from "@scalar/fastify-api-reference"

const app = fastify()

app.register(fastifyCors, {
  origin: "*"
})

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Docs Open API NVL 12 FTR",
      version: "1.0.0",
    }
  }
})

app.get("/openapi.json", () => app.swagger())

app.register(scalarUI, {
  routePrefix: "/docs",
  configuration: {
    layout: "modern"
  }
})

app.listen({ port: 3333 }).then(() => {
  console.log("HTTP server running!") ;
})
