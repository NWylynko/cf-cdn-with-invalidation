import "dotenv/config"
import { drizzle } from 'drizzle-orm/neon-http';
import { migrate } from "drizzle-orm/neon-http/migrator";
import * as driz from "drizzle-orm";
import { z } from "zod"
import * as schema from "./schema.js"

const env = z.object({
  DATABASE_URL: z.string().url(),
}).parse(process.env)

console.log(env)

const db = drizzle(env.DATABASE_URL);

await migrate(db, {
  "migrationsFolder": "./drizzle"
});

export { db, driz, schema }