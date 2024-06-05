import {
  bigserial,
  pgEnum,
  pgTable,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { profile } from "../profile/profile.sql";

export const logType = pgEnum("log_type", [
  "login",
  "logout",
  "attempt_match",
  "reveal_answer",
  "reveal_score",
  "accept_match",
  "dismiss_match",
]);
export const analytic = pgTable("analytic", {
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  id: bigserial("id", { mode: "number" }).primaryKey().notNull(),
  created_at: timestamp("created_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  type: logType("type").notNull(),
  user_auth_id: uuid("user_auth_id")
    .notNull()
    .references(() => profile.auth_id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  related_user_auth_id: uuid("related_user_auth_id").references(
    () => profile.auth_id,
    {
      onDelete: "cascade",
      onUpdate: "cascade",
    },
  ),
});
