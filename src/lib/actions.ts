"use server";

import { redirect } from "next/navigation";
import { createClient } from "./supabase/server";
import { db } from "./drizzle/db";
import { answer, notification, profile, questionnaire } from "./drizzle/schema";
import { and, desc, eq, gt, inArray, or } from "drizzle-orm";

const NOTIFICATION_EXPIRATION = 2; // minutes

const lastTwoMinutes = () =>
  new Date(Date.now() - NOTIFICATION_EXPIRATION * 60 * 1000).toISOString();

export async function signout() {
  try {
    const supabase = createClient();
    await supabase.auth.signOut();
  } catch (error) {
    console.error(error);
    return {
      message: "Failed to sign out",
    };
  }

  redirect("/");
}

export async function addNotification(from_user: string, to_user: string) {
  try {
    // Does a notification in the last 2 minutes already exist?
    const existingNotification = await db
      .select()
      .from(notification)
      .where(
        and(
          gt(notification.created_at, lastTwoMinutes()),
          or(
            and(
              eq(notification.from_user, from_user),
              eq(notification.to_user, to_user),
            ),
            and(
              eq(notification.from_user, to_user),
              eq(notification.to_user, from_user),
            ),
          ),
        ),
      );

    if (existingNotification.length) {
      console.log("Notification already exists");
      return existingNotification[0];
    }

    // Add a new notification
    const newNotification = await db
      .insert(notification)
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

    const data = { ...newNotification, fromUserName };
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getRecentPendingNotification(userId: string) {
  try {
    // Find the last pending notification created in the last 2 minutes
    const recentPendingNotification = await db
      .select()
      .from(notification)
      .where(
        and(
          eq(notification.to_user, userId),
          eq(notification.status, "pending"),
          gt(notification.created_at, new Date(lastTwoMinutes()).toISOString()),
        ),
      )
      .orderBy(desc(notification.created_at))
      .limit(1)
      .innerJoin(profile, eq(profile.auth_id, notification.from_user))
      .then((rows) => {
        if (rows.length) {
          return rows[0];
        }

        return null;
      });

    return recentPendingNotification;
  } catch (error) {
    console.error(error);
  }
}

const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export async function acceptNotification(notificationId: number) {
  try {
    // Update the notification status to accepted
    await db
      .update(notification)
      .set({ status: "accepted", question_to_show: getRandomInt(2, 3) })
      .where(eq(notification.id, notificationId));
  } catch (error) {
    console.error(error);
    return {
      message: "Failed to accept notification",
    };
  }
}

export async function getQA(notiifcationId: string) {
  try {
    const notificationData = await db
      .select()
      .from(notification)
      .where(eq(notification.id, Number(notiifcationId)))
      .then((rows) => rows[0]);

    if (
      !notificationData.from_user ||
      !notificationData.to_user ||
      !notificationData.question_to_show
    )
      return;

    const data = await db
      .select()
      .from(answer)
      .innerJoin(questionnaire, eq(questionnaire.id, answer.question_id))
      .innerJoin(profile, eq(profile.auth_id, answer.auth_id))
      .where(
        and(
          eq(answer.question_id, notificationData.question_to_show),
          inArray(answer.auth_id, [
            notificationData.to_user,
            notificationData.from_user,
          ]),
        ),
      );

    console.log(data);

    return data;
  } catch (error) {
    console.error(error);
  }
}
