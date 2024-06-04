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

export const sendCode = async (request: Request) => {
  const formData = await request.formData();
  const rawPhone = formData.get("phone") as string;
  if (!rawPhone) {
    return {
      error: "No phone number provided",
    };
  }

  const phone = `1${rawPhone.replace(/\D/g, "")}`;
  const { supabase } = await createClient(request);

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

// TODO: Complete
export const verifyCode = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("done");
    }, 2000);
  });
};
