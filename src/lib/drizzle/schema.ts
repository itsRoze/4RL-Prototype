// Used only to model the schema. Schema is defined via Supabase
// Migrations handledd via Supabase CLI, Drizzle is only for queries

import {
  pgTable,
  unique,
  bigint,
  timestamp,
  uuid,
  boolean,
  text,
  bigserial,
  pgEnum,
} from "drizzle-orm/pg-core";

export const profile = pgTable(
  "profile",
  {
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    id: bigint("id", { mode: "number" }).primaryKey().notNull(),
    created_at: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
    auth_id: uuid("auth_id"),
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

export const matchStatus = pgEnum("match_status", ["pending", "accepted"]);
export const notification = pgTable("notification", {
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
});

export const questionnaire = pgTable("questionnaire", {
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  id: bigint("id", { mode: "number" }).primaryKey().notNull(),
  createdAt: timestamp("created_at", { mode: "string" }).defaultNow(),
  question: text("question").notNull(),
});

export const answer = pgTable(
  "answer",
  {
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    id: bigint("id", { mode: "number" }).primaryKey().notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    questionId: bigint("question_id", { mode: "number" })
      .notNull()
      .references(() => questionnaire.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    response: text("response").notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" }).notNull(),
    authId: uuid("auth_id")
      .notNull()
      .references(() => profile.auth_id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
  },
  (table) => {
    return {
      questionAuthUnique: unique("question_auth_unique").on(
        table.questionId,
        table.authId,
      ),
    };
  },
);
