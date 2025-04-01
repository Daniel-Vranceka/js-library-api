import Fastify from "fastify";
import { routes } from "./routes/route";

const fastify = Fastify({ logger: true });

fastify.register(routes, { prefix: "/api" });

fastify.listen({ port: 8000 }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Server running on ${address}`);
});
