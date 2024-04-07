"use client";

import { signout } from "@/lib/actions";

const SignoutBtn = () => {
  return <button onClick={async () => await signout()}>Signout</button>;
};

export default SignoutBtn;
