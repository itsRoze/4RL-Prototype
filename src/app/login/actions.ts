"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export const sendCode = async (formData: FormData) => {
  console.log("SENDING CODE");

  const rawPhone = formData.get("phone") as string;
  if (!rawPhone) {
    console.error("No phone number provided");
    return;
  }

  const phone = `1${rawPhone.replace(/\D/g, "")}`;
  const supabase = createClient();

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
  redirect(`/login/verify?phone=${phone}`);
};

export type State = {
  message?: string | null;
};

export const resendCode = async (phone: string) => {
  try {
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithOtp({
      phone: `+${phone}`,
    });

    if (error) {
      console.log(error);
      return {
        message: error.message,
      };
    }
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
  prevState: State,
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
    const { error } = await supabase.auth.verifyOtp({
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

  redirect("/");
};
