import {
  pgTable,
  bigint,
  timestamp,
  uuid,
  text,
  bigserial,
  pgEnum,
} from "drizzle-orm/pg-core";
import { profile } from "../profile/profile.sql";
import { questionnaire } from "../questionnaire/questionnaire.sql";

export const matchStatus = pgEnum("match_status", ["pending", "accepted"]);
export const match = pgTable("match", {
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  id: bigserial("id", { mode: "number" }).primaryKey().notNull(),
  created_at: timestamp("created_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  to_user: uuid("to_user").references(() => profile.auth_id, {
    onDelete: "cascade",
    onUpdate: "cascade",
  }),
  from_user: uuid("from_user").references(() => profile.auth_id, {
    onDelete: "cascade",
    onUpdate: "cascade",
  }),
  status: matchStatus("status").default("pending").notNull(),
  question_to_show: bigint("question_to_show", { mode: "number" }).references(
    () => questionnaire.id,
    { onDelete: "cascade", onUpdate: "cascade" },
  ),
  matchmaking_score: text("matchmaking_score"),
});
