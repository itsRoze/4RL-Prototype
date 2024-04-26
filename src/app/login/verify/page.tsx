import { VerifyForm } from "@/ui/login/verify-form";
import { redirect } from "next/navigation";

export default function Page({
  searchParams,
}: {
  searchParams: {
    phone: string;
  };
}) {
  const phone = searchParams.phone;

  if (!phone) {
    redirect("/404");
  }

  return <VerifyForm phone={phone} />;
}
