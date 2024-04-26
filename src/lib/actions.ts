"use server";

import { redirect } from "next/navigation";
import { createClient } from "./supabase/server";
import { db } from "./drizzle/db";
import { answer, match, profile, questionnaire } from "./drizzle/schema";
import { and, desc, eq, gt, inArray, or } from "drizzle-orm";
import { getRandomMatchmakingLine } from "@/utils/matchmaking";
import { DrizzleUtil } from "./drizzle/util";

const NOTIFICATION_EXPIRATION = 2; // minutes

const lastTwoMinutes = () =>
  new Date(Date.now() - NOTIFICATION_EXPIRATION * 60 * 1000).toISOString();

export async function signout() {
  try {
    const supabase = createClient();
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      console.error(error);
      return;
    }
    if (!data || !data.user) {
      console.error("No user found");
      return;
    }

    await supabase.auth.signOut();

    // log to analytics
    await DrizzleUtil.logEvent({
      type: "logout",
      user_auth_id: data.user.id,
    });
  } catch (error) {
    console.error(error);
    return {
      message: "Failed to sign out",
    };
  }

  redirect("/");
}

export async function addMatch(from_user: string, to_user: string) {
  try {
    // Does a pending match in the last 2 minutes already exist?
    const existingMatch = await db
      .select()
      .from(match)
      .where(
        and(
          gt(match.created_at, lastTwoMinutes()),
          or(
            and(eq(match.from_user, from_user), eq(match.to_user, to_user)),
            and(eq(match.from_user, to_user), eq(match.to_user, from_user)),
          ),
        ),
      );

    console.log(existingMatch);

    if (existingMatch.length) {
      console.log("Match already exists");
      return existingMatch[0];
    }

    // Add a new match
    const newMatch = await db
      .insert(match)
      .values({
        from_user,
        to_user,
      })
      .returning()
      .then((rows) => rows[0]);

    const fromUserName = await db
      .select({ name: profile.name })
      .from(profile)
      .where(eq(profile.auth_id, from_user))
      .then((rows) => rows[0].name);

    if (!fromUserName) {
      console.error("Failed to get name of user");
      return;
    }

    const data = { ...newMatch, fromUserName };
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getRecentPendingMatch(userId: string) {
  try {
    // Find the last pending match created in the last 2 minutes
    const recentPendingMatch = await db
      .select()
      .from(match)
      .where(
        and(
          eq(match.to_user, userId),
          eq(match.status, "pending"),
          gt(match.created_at, new Date(lastTwoMinutes()).toISOString()),
        ),
      )
      .orderBy(desc(match.created_at))
      .limit(1)
      .innerJoin(profile, eq(profile.auth_id, match.from_user))
      .then((rows) => {
        if (rows.length) {
          return rows[0];
        }

        return null;
      });

    return recentPendingMatch;
  } catch (error) {
    console.error(error);
  }
}

const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export async function acceptMatch(matchId: number) {
  try {
    // Update the match status to accepted
    await db
      .update(match)
      .set({
        status: "accepted",
        question_to_show: getRandomInt(2, 3),
        matchmaking_score: getRandomMatchmakingLine(),
      })
      .where(eq(match.id, matchId));
  } catch (error) {
    console.error(error);
    return {
      message: "Failed to accept match",
    };
  }
}

export async function getQA(matchId: string) {
  try {
    const matchData = await db
      .select()
      .from(match)
      .where(eq(match.id, Number(matchId)))
      .then((rows) => rows[0]);

    if (
      !matchData.from_user ||
      !matchData.to_user ||
      !matchData.question_to_show
    )
      return;

    const data = await db
      .select()
      .from(answer)
      .innerJoin(questionnaire, eq(questionnaire.id, answer.question_id))
      .innerJoin(profile, eq(profile.auth_id, answer.auth_id))
      .where(
        and(
          eq(answer.question_id, matchData.question_to_show),
          inArray(answer.auth_id, [matchData.to_user, matchData.from_user]),
        ),
      );

    const response = [];
    for (const row of data) {
      response.push({
        profileName: row.profile.name,
        question: row.questionnaire.question,
        response: row.answer.response,
        score: matchData.matchmaking_score,
      });
    }

    return response;
  } catch (error) {
    console.error(error);
  }
}
