"use client";

import { signout } from "@/lib/actions";
import { IconLogout } from "../icons";
import { useState } from "react";

const SignoutBtn = () => {
  const [showPrompt, setShowPrompt] = useState(false);
  return (
    <>
      <button
        onClick={() => setShowPrompt(true)}
        className="text-gray-500 hover:text-gray-500"
      >
        <IconLogout size={24} />
      </button>
      <SignoutPrompt show={showPrompt} setShow={setShowPrompt} />
    </>
  );
};

interface PromptProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignoutPrompt: React.FC<PromptProps> = ({ show, setShow }) => {
  const yes = async () => {
    await signout();
  };

  const no = () => {
    setShow(false);
  };

  if (!show) {
    return null;
  }

  return (
    <div className="animate-in fixed inset-0 z-50 flex overflow-auto outline-none focus:outline-none">
      <div className="relative mx-auto my-8 w-full max-w-xs md:max-w-sm ">
        <div className="relative flex w-full flex-col border border-black bg-[#FEFBF5] px-2 py-4 shadow-sm shadow-black outline-none focus:outline-none">
          <div className="flex items-center justify-center gap-1 font-extralight">
            <p>Logout?</p>
          </div>
          <div className="flex items-center justify-center gap-8 pb-4 pt-6 text-sm font-extralight">
            <button onClick={yes}>Yes</button>
            <button onClick={no}>No</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignoutBtn;
