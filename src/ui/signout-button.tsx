"use client";

import { signout } from "@/lib/actions";
import { IconLogout } from "./icons";

const SignoutBtn = () => {
  return (
    <button
      onClick={async () => await signout()}
      className="text-gray-500 hover:text-gray-500"
    >
      <IconLogout size={24} />
    </button>
  );
};

export default SignoutBtn;
