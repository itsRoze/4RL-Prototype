"use client";

import { usePathname, useRouter } from "next/navigation";
import { IconCamera } from "../icons";

export const CameraBtn = () => {
  const pathname = usePathname();
  const router = useRouter();
  if (pathname === "/scan" || pathname === "/questionnaire") return null;

  return (
    <button
      className="text-gray-600 hover:text-gray-500 "
      onClick={() => router.push("/scan")}
    >
      <IconCamera size={28} />
    </button>
  );
};
