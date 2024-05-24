import { createClient } from "@/lib/supabase/server";
import Notification from "@/ui/notification";
import QRCodeProfile from "@/ui/qr-code";
import { MatchSubscription } from "@/ui/match-subscription";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/login");
  }

  const { data } = await supabase
    .from("profile")
    .select("name, completed_questionnaire")
    .eq("auth_id", user.id)
    .limit(1)
    .single();

  if (!data) {
    redirect("/error");
  }

  if (!data.completed_questionnaire) {
    redirect("/questionnaire");
  }

  return (
    <>
      <Notification authId={user.id} />
      <section className="flex w-full flex-col items-center gap-12">
        <div>
          <h1 className="pb-2 text-3xl font-extralight">Welcome {data.name}</h1>
          <p className="text-xl font-extralight">
            Scan someone else&apos;s QR code (or have them scan yours) and let
            the fun begin
          </p>
        </div>
        <div className="h-auto w-48">
          <QRCodeProfile path={"/profile/" + user.id} />
        </div>
      </section>{" "}
      <MatchSubscription currentUserId={user.id} />
    </>
  );
}
