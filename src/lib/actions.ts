"use server";

import { redirect } from "next/navigation";
import { createClient } from "./supabase/server";

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
