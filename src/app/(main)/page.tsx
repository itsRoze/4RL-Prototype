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
      <section className="flex w-full flex-col items-center gap-12">
        <h1 className="pb-4 text-4xl font-extralight">
          Welcome {data.name}. Have your QR code scanned by another person and
          let the fun begin
        </h1>
        <div className="h-auto w-48">
          <QRCodeProfile path={"/profile/" + user.id} />
        </div>
      </section>{" "}
      <Notification authId={user.id} />
      <MatchSubscription currentUserId={user.id} />
    </>
  );
}
