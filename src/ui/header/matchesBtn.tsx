"use client";

import { usePathname, useRouter } from "next/navigation";
import { IconCrystalBall } from "../icons";

export const MatchesBtn = () => {
  const pathname = usePathname();
  const router = useRouter();
  if (pathname === "/history" || pathname === "/questionnaire") return null;

  return (
    <button
      className="text-gray-600 hover:text-gray-500 "
      onClick={() => router.push("/history")}
    >
      <IconCrystalBall size={28} />
    </button>
  );
};
