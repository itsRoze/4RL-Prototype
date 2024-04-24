"use client";

import { useFormStatus } from "react-dom";
import { Button } from "../button";
import { Loader } from "../loader";

export function TextCodeButton() {
  const { pending } = useFormStatus();

  if (pending) {
    return <Loader />;
  }
  return <Button type="submit" disabled={pending} title="Text Code" />;
}
