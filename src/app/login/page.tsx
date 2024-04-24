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
      className="font-extralight flex flex-col items-center gap-40"
    >
      <div className="w-full">
        <div className="text-2xl py-4 px-2 border border-black flex gap-2 items-center w-full">
          <span>+1</span>
          <span className="text-gray-400">US</span>
          <PhoneInput />
        </div>
        {error.message ? (
          <span className="text-sm py-2 text-red-600">Failed to send</span>
        ) : null}
      </div>
      <TextCodeButton />
    </form>
  );
}
