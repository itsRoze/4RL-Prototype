import {
  pgTable,
  unique,
  timestamp,
  uuid,
  boolean,
  text,
  pgSchema,
  bigserial,
} from "drizzle-orm/pg-core";

const SupabaseAuthSchema = pgSchema("auth");
const SupabaseAuthUsers = SupabaseAuthSchema.table("users", {
  id: uuid("id").primaryKey().notNull(),
});

export const profile = pgTable(
  "profile",
  {
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    id: bigserial("id", { mode: "number" }).primaryKey().notNull(),
    created_at: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
    auth_id: uuid("auth_id").references(() => SupabaseAuthUsers.id, {
      onUpdate: "cascade",
      onDelete: "cascade",
    }),
    completed_questionnaire: boolean("completed_questionnaire")
      .default(false)
      .notNull(),
    name: text("name"),
  },
  (table) => {
    return {
      profileAuthIdKey: unique("profile_auth_id_key").on(table.auth_id),
    };
  },
);
