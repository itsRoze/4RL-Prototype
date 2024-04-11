"use client";

import { useFormStatus } from "react-dom";
import { Button } from "../button";

export const SubmitButton = () => {
  const { pending } = useFormStatus();

  if (pending) return <Loader />;

  return (
    <Button
      disabled={pending}
      className="float-right"
      type="submit"
      title="Cool, I'm done"
    />
  );
};

const Loader = () => {
  return (
    <div className="flex">
      <span className="sr-only">Loading...</span>
      <div className="h-4 w-4 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="h-4 w-4 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="h-4 w-4 bg-black rounded-full animate-bounce"></div>
    </div>
  );
};
