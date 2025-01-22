import { pgTable } from "drizzle-orm/pg-core";

export const dataTable = pgTable("data", (t) => ({
  number: t.integer().default(Math.floor(Math.random() * 100_000_000)),
}));
