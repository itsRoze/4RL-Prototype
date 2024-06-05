import { profile } from "./profile.sql";
import { db } from "../../db";
import { eq } from "drizzle-orm";

export type Info = typeof profile.$inferSelect;

export const create = async (input: typeof profile.$inferInsert) => {
  const records = await db.insert(profile).values(input).returning();

  if (records.length) return records[0];
};

export const fromAuthId = async (auth_id: Info["auth_id"]) => {
  const records = await db
    .select()
    .from(profile)
    .where(eq(profile.auth_id, auth_id));
  if (records.length) return records[0];
};
