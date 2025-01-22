import fastify from "fastify";
import cors from "@fastify/cors";
import { db, driz, schema } from "./database.js"

const app = fastify({ logger: true });

app.register(cors);

app.get("/", async (req, res) => {

  const [data] = await db
    .select()
    .from(schema.dataTable)

  return { result: data };
});

app.post("/", async (req, res) => {

  await db
    .update(schema.dataTable)
    .set({ number: Math.floor(Math.random() * 100_000_000) })

  // call back to cf to invalidate cache

});

await app.listen({ port: 4000, host: "0.0.0.0" })