"use client";

import { CodeForm } from "@/ui/login/code-form";
import { formatPhoneNumber } from "@/utils/formatPhoneNumber";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Resend } from "@/ui/login/resend";

export default function Page({
  searchParams,
}: {
  searchParams: {
    phone: string;
  };
}) {
  const router = useRouter();

  const phone = searchParams.phone;
  if (!phone) {
    router.push("/404");
  }

  return (
    <>
      <div className="font-extralight text-sm flex justify-between py-2">
        <p className="no-underline">Text sent to {formatPhoneNumber(phone)}</p>
        <div className="flex gap-2 underline">
          {/* TODO: Finish Resend Button*/}
          <Resend phone={phone} />
          <Link href="/login">Change number</Link>
        </div>
      </div>
      <CodeForm phone={phone} />
    </>
  );
}
