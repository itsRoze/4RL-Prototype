import { createClient } from "@/lib/supabase/server";
import Notification from "@/ui/notification";
import QRCodeProfile from "@/ui/qr-code";
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
    .select("completed_questionnaire")
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
      <section className="w-full flex flex-col items-center gap-12">
        <h1 className="text-4xl font-extralight pb-4">
          Have your QR code scanned by another person and let the matchmaking
          begin
        </h1>
        <div className="h-auto w-48">
          <QRCodeProfile path={"/profile/" + user.id} />
        </div>
      </section>{" "}
      <Notification authId={user.id} />
    </>
  );
}
