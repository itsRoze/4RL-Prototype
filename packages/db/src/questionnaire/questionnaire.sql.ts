import { bigserial, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const questionnaire = pgTable("questionnaire", {
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  id: bigserial("id", { mode: "number" }).primaryKey().notNull(),
  created_at: timestamp("created_at", { mode: "string" }).defaultNow(),
  question: text("question").notNull(),
});
