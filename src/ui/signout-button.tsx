"use client";

import { signout } from "@/lib/actions";
import { IconLogout } from "./icons";

const SignoutBtn = () => {
  return (
    <button
      onClick={async () => await signout()}
      className="text-gray-600 hover:text-gray-500"
    >
      <IconLogout width={24} height={24} />
    </button>
  );
};

export default SignoutBtn;
