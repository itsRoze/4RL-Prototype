"use client";

import { useFormStatus } from "react-dom";
import { Button } from "../button";
import { Loader } from "../loader";

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
