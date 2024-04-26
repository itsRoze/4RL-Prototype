"use client";

import { formatPhoneNumber } from "@/utils/formatPhoneNumber";
import Link from "next/link";
import { State, verify } from "@/app/login/actions";
import { useFormState } from "react-dom";
import { VerifyCodeButton } from "@/ui/login/verify-code";
import { Resend } from "@/ui/login/resend";
import { useState } from "react";

interface Props {
  phone: string;
}

export const VerifyForm: React.FC<Props> = ({ phone }) => {
  const initialState: State = { message: null };

  const verifyWithPhone = verify.bind(null, phone);
  const [state, dispatch] = useFormState(verifyWithPhone, initialState);
  const [error, setError] = useState("");

  return (
    <>
      <div className="font-extralight text-sm flex justify-between py-2">
        <p className="no-underline">Text sent to {formatPhoneNumber(phone)}</p>
        <div className="flex gap-2">
          <Resend phone={phone} setError={setError} />
          <Link className="underline" href="/login">
            Change number
          </Link>
        </div>
      </div>

      <form
        action={dispatch}
        className="font-extralight flex flex-col items-center gap-40"
      >
        <div className="w-full">
          <div className="text-2xl py-4 px-2 border border-black flex gap-2 items-center w-full">
            <input
              type="text"
              placeholder="XXXXXX"
              name="token"
              autoFocus
              className="w-11/12 flex-1 bg-transparent focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50"
              maxLength={6}
            />
          </div>
          {state.message ? (
            <p className="text-sm text-red-600 py-2">{state.message}</p>
          ) : null}
          {error ? <p className="text-sm text-red-600 py-2">{error}</p> : null}
        </div>
        <VerifyCodeButton />
      </form>
    </>
  );
};
