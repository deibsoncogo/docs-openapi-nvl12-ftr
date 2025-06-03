import fastifyCors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import fastify from "fastify";

const app = fastify()

app.register(fastifyCors, {
  origin: "*"
})

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Example API Docs",
      version: "1.0.0",
    }
  }
})

app.get("/spec.json", () => app.swagger())

app.listen({ port: 3333 }).then(() => {
  console.log("HTTP server running!") ;
})
