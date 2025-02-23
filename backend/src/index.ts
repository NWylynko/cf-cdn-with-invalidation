import fastify from "fastify";
import cors from "@fastify/cors";
import { db, driz, schema } from "./database.js"
import Cloudflare from 'cloudflare';
import { z } from "zod";

const app = fastify({ logger: true });

app.register(cors);

app.get("/", async (req, res) => {

  const [data] = await db
    .select()
    .from(schema.dataTable)

  res
    .status(200)
    .header("Content-Type", "application/json")
    .send(data)
});

app.put("/", async (req, res) => {
  await db
    .update(schema.dataTable)
    .set({ number: Math.floor(Math.random() * 100_000_000) })
})

const env = z.object({
  CF_API_TOKEN: z.string(),
  CF_ZONE_ID: z.string(),
}).parse(process.env)

const cloudflare = new Cloudflare({
  apiToken: env.CF_API_TOKEN,
});

app.post("/", async (req, res) => {

  const start = performance.now();

  const result = await cloudflare.cache.purge({
    zone_id: env.CF_ZONE_ID,
    files: ["https://cf-cdn-origin.wylynko.dev"]
  })

  const end = performance.now();
  const duration = end - start;

  res
    .status(200)
    .header("Content-Type", "application/json")
    .send({ result, duration })
});

await app.listen({ port: 4000, host: "0.0.0.0" })

