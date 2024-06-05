import {
  bigint,
  bigserial,
  pgTable,
  text,
  timestamp,
  unique,
  uuid,
} from "drizzle-orm/pg-core";
import { questionnaire } from "../questionnaire/questionnaire.sql";
import { profile } from "../profile/profile.sql";

export const answer = pgTable(
  "answer",
  {
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    id: bigserial("id", { mode: "number" }).primaryKey().notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    question_id: bigint("question_id", { mode: "number" })
      .notNull()
      .references(() => questionnaire.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    response: text("response").notNull(),
    updated_at: timestamp("updated_at", { mode: "string" }).notNull(),
    auth_id: uuid("auth_id")
      .notNull()
      .references(() => profile.auth_id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
  },
  (table) => {
    return {
      questionAuthUnique: unique("question_auth_unique").on(
        table.question_id,
        table.auth_id,
      ),
    };
  },
);
