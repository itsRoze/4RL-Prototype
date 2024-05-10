"use client";

import { usePathname, useRouter } from "next/navigation";
import { IconHome } from "../icons";

export const HomeBtn = () => {
  const pathname = usePathname();
  const router = useRouter();
  if (pathname === "/" || pathname === "/questionnaire") return null;

  return (
    <button
      className="text-gray-600 hover:text-gray-500"
      onClick={() => router.push("/")}
    >
      <IconHome size={24} />
    </button>
  );
};
