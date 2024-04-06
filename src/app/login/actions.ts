"use server";

import { createClient } from "@/lib/supabase/server";

export const sendCode = async (formData: FormData) => {
  console.log("SENDING CODE");

  const phone = formData.get("phone") as string;
  if (!phone) {
    console.error("No phone number provided");
    return;
  }

  const supabase = createClient();

  const { error } = await supabase.auth.signInWithOtp({
    phone,
  });

  if (error) {
    console.log(error);
  } else {
    console.log("sent text");
  }
};

export const verify = async (formData: FormData) => {
  console.log("VERIFYING");

  const token = formData.get("token") as string;
  if (!token) {
    console.error("No token provided");
    return;
  }

  const supabase = createClient();

  const {
    data: { session },
    error,
  } = await supabase.auth.verifyOtp({
    type: "sms",
    phone: "+16019839224",
    token,
  });

  if (error) {
    console.error(error);
  } else {
    console.log(session);
  }
};
