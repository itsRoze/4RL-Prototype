import { db } from "../../db";
import { analytic } from "./analytic.sql";

export type Info = typeof analytic.$inferSelect;
type Insert = typeof analytic.$inferInsert;

export const log = async (input: Omit<Insert, "id" | "created_at">) => {
  await db.insert(analytic).values(input);
};
