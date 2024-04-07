"use client";

import { useFormState } from "react-dom";
import { Button } from "../button";
import { State, verify } from "@/app/login/actions";

interface Props {
  phone: string;
}

export const CodeForm: React.FC<Props> = ({ phone }) => {
  const initialState: State = { message: null };

  const verifyWithPhone = verify.bind(null, phone);
  const [state, dispatch] = useFormState(verifyWithPhone, initialState);

  return (
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
      </div>
      <Button type="submit" title="Take me in" />
    </form>
  );
};
