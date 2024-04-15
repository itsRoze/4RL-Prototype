"use server";

import { redirect } from "next/navigation";
import { createClient } from "./supabase/server";
import { db } from "./drizzle/db";
import { notification, profile } from "./drizzle/schema";
import { and, desc, eq, gt, or } from "drizzle-orm";

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
    // Does a notification already exist?
    const existingNotification = await db
      .select()
      .from(notification)
      .where(
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
      );

    console.log(existingNotification);
    if (existingNotification.length) {
      return {
        message: "Notification already exists",
      };
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
      return {
        message: "Failed to get Name of user",
      };
    }

    const data = { ...newNotification, fromUserName };
    return data;
  } catch (error) {
    console.error(error);
    return {
      message: "Failed to add notification",
    };
  }
}

export async function getRecentPendingNotification(userId: string) {
  try {
    // Find the last pending notification created in the last 5 minutes
    const recentPendingNotification = await db
      .select()
      .from(notification)
      .where(
        and(
          eq(notification.to_user, userId),
          eq(notification.status, "pending"),
          gt(
            notification.created_at,
            new Date(Date.now() - 5 * 60 * 1000).toISOString(),
          ),
        ),
      )
      .orderBy(desc(notification.created_at))
      .limit(1)
      .innerJoin(profile, eq(profile.auth_id, userId))
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
