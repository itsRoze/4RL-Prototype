import { db } from "./db";
import { analytic, logType } from "./schema";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export * as DrizzleUtil from "./util";

const analyticInsertSchema = createInsertSchema(analytic);
type AnalyticInsertSchema = z.infer<typeof analyticInsertSchema>;

export const logEvent = async (
  data: Omit<AnalyticInsertSchema, "id" | "created_at">,
) => {
  await db.insert(analytic).values(data);
};
