import { Analytic, Profile } from "@beta/db";
import { redirect } from "@remix-run/node";
import { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "~/lib/supabase/server";

export const requireUser = async (supabase: SupabaseClient) => {
  try {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
      throw redirect("/");
    }
    return data.user;
  } catch (error) {
    throw redirect("/");
  }
};

export const requireAnonymous = async (supabase: SupabaseClient) => {
  const { data } = await supabase.auth.getUser();
  if (data.user) {
    throw redirect("/home");
  }
};

export const sendCode = async (request: Request, supabase: SupabaseClient) => {
  const formData = await request.formData();
  const rawPhone = formData.get("phone") as string;
  if (!rawPhone) {
    return {
      error: "No phone number provided",
    };
  }

  const phone = `1${rawPhone.replace(/\D/g, "")}`;

  try {
    // This will also create the user if they don't exist
    const { error } = await supabase.auth.signInWithOtp({
      phone: `+${phone}`,
    });

    if (error) {
      console.error(error);
      return {
        error: error.message,
      };
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        error: error.message,
      };
    }

    return {
      error: "Failed to send",
    };
  }

  return { error: undefined, phone };
};

export const resendCode = async (phone: string, request: Request) => {
  try {
    const { supabase } = await createClient(request);

    const { error } = await supabase.auth.signInWithOtp({
      phone: `+${phone}`,
    });

    if (error) {
      console.error(error);
      return {
        error: error.message,
      };
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        error: error.message,
      };
    }

    return {
      error: "Oops, couldn't resend code",
    };
  }
  return { error: undefined };
};

export const verifyCode = async (
  request: Request,
  supabase: SupabaseClient,
) => {
  try {
    const formData = await request.formData();

    const token = String(formData.get("token"));
    const phone = String(formData.get("phone"));
    if (!token) {
      console.error("No token provided");
      return {
        error: "No token provided",
      };
    }

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
        error: error.message,
      };
    }

    if (!user) {
      return {
        error: "Oops, something went wrong. Please try again.",
      };
    }

    // see if this is a new user
    let profile = await Profile.fromAuthId(user.id);
    if (!profile) {
      profile = await Profile.create({
        auth_id: user.id,
      });
    }
    if (!profile || !profile.auth_id) {
      return {
        error: "Failed to create profile. Please try again",
      };
    }

    await Analytic.log({
      user_auth_id: profile.auth_id,
      type: "login",
    });

    return { error: undefined, ok: true };
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return {
        error: error.message,
      };
    }

    return {
      error: "Oops, couldn't verify your code",
    };
  }
};
