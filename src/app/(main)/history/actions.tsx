"use server";

import { db } from "@/lib/drizzle/db";
import { match, profile, questionnaire } from "@/lib/drizzle/schema";
import { and, eq, ne, or } from "drizzle-orm";

export const getMatchHistory = async (authId: string) => {
  const data = await db
    .select({
      matchId: match.id,
      question: questionnaire.question,
      score: match.matchmaking_score,
      matchedUserName: profile.name,
    })
    .from(match)
    .innerJoin(
      profile,
      or(
        and(ne(match.from_user, authId), eq(profile.auth_id, match.from_user)),
        and(ne(match.to_user, authId), eq(profile.auth_id, match.to_user)),
      ),
    )
    .innerJoin(questionnaire, eq(questionnaire.id, match.question_to_show))
    .where(
      and(
        eq(match.status, "accepted"),
        or(eq(match.to_user, authId), eq(match.from_user, authId)),
      ),
    );

  return data;
};
