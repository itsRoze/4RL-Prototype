"use server";

import { signout } from "@/lib/actions";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const sendCode = async (_prevState: State, formData: FormData) => {
  console.log(" SENDING CODE");

  const rawPhone = formData.get("phone") as string;
  if (!rawPhone) {
    console.error("No phone number provided");
    return {
      message: "No phone number provided",
    };
  }

  const phone = `1${rawPhone.replace(/\D/g, "")}`;
  const supabase = createClient();

  try {
    // This will also create the user if they don't exist
    const { error } = await supabase.auth.signInWithOtp({
      phone: `+${phone}`,
    });

    if (error) {
      console.log(error);
      return {
        message: error.message,
      };
    }

    console.log("Code sent to", phone);
  } catch (error) {
    if (error instanceof Error) {
      return {
        message: error.message,
      };
    }

    return {
      message: "Oops, something went wrong. Please try again.",
    };
  }

  redirect(`/login/verify?phone=${phone}`);
};

export type State = {
  message?: string | null;
};

export const resendCode = async (phone: string) => {
  try {
    console.log("Resending code");
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithOtp({
      phone: `+${phone}`,
    });

    if (error) {
      console.error(error);
      return {
        message: error.message,
      };
    }

    console.log("Code resent to", phone);
  } catch (error) {
    if (error instanceof Error) {
      return {
        message: error.message,
      };
    }

    return {
      message: "Oops, something went wrong. Please try again.",
    };
  }
};

export const verify = async (
  phone: string,
  _prevState: State,
  formData: FormData,
) => {
  console.log("VERIFYING");

  try {
    const token = formData.get("token") as string;
    if (!token) {
      console.error("No token provided");
      return {
        message: "No token provided",
      };
    }

    const supabase = createClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.verifyOtp({
      type: "sms",
      phone,
      token,
    });

    if (error) {
      console.error(error);
      return {
        message: error.message,
      };
    }

    if (!user) {
      return {
        message: "Oops, something went wrong. Please try again.",
      };
    }

    console.log("Checking database for user");

    // See if user exists in database
    const { data: userInfo, error: dbError } = await supabase
      .from("profile")
      .select()
      .eq("auth_id", user.id)
      .maybeSingle();

    if (dbError) {
      console.error(dbError);
      // signout user
      await signout();
      return {
        message: dbError.message,
      };
    }

    console.log(userInfo);

    if (!userInfo) {
      // Create new user
      console.log("Creating new user");
      const { error: insertError } = await supabase.from("profile").insert({
        auth_id: user.id,
      });

      if (insertError) {
        console.error(insertError);
        await signout();
        return {
          message: insertError.message,
        };
      }
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
