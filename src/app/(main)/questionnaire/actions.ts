"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type State = {
  message?: string | null;
};

export const submitQuestionnaire = async (
  _prevState: State,
  formData: FormData,
) => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      message: "User not found",
    };
  }

  try {
    const responses = Object.fromEntries(formData.entries());

    // first question is the name
    const name = formData.get("1");

    if (!name) {
      return {
        message: "Missing name",
      };
    }

    // Save responses
    const formattedResponses = [];
    const updatedAt = new Date().toISOString();
    for (const key in responses) {
      // Is key a number?
      if (isNaN(Number(key)) || Number(key) > 3) {
        continue;
      }

      formattedResponses.push({
        question_id: Number(key),
        response: responses[key].toString(),
        updated_at: updatedAt,
        auth_id: user.id,
      });
    }

    const { error: responseError } = await supabase
      .from("answer")
      .upsert(formattedResponses, {
        onConflict: "question_id, auth_id",
      });

    if (responseError) {
      console.error(responseError);
      return {
        message: responseError.message,
      };
    }

    // Save name to profile and complete questionnaire
    const { error } = await supabase
      .from("profile")
      .update({ name: name.toString(), completed_questionnaire: true })
      .eq("auth_id", user.id);

    if (error) {
      console.error(error);
      return {
        message: error.message,
      };
    }
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return {
        message: error.message,
      };
    }

    return {
      message: "Oops, something went wrong. Please try again.",
    };
  }

  revalidatePath("/", "layout");
  redirect("/");
};
