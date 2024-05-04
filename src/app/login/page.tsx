"use client";

import PhoneInput from "@/ui/login/phoneinput";
import { State, sendCode } from "./actions";
import { TextCodeButton } from "@/ui/login/text-code";
import { useFormState } from "react-dom";

export default function Signup() {
  const initialState: State = { message: null };
  const [error, dispatch] = useFormState(sendCode, initialState);

  return (
    <form
      action={dispatch}
      className="flex flex-col items-center gap-20 font-extralight"
    >
      <div className="w-full">
        <div className="flex w-full items-center gap-2 border border-black px-2 py-4 text-2xl">
          <span>+1</span>
          <span className="text-gray-400">US</span>
          <PhoneInput />
        </div>
        <p className="h-8 w-full py-2 text-sm text-red-600">
          {error.message ? "Failed to send" : ""}
        </p>
      </div>
      <TextCodeButton />
    </form>
  );
}
