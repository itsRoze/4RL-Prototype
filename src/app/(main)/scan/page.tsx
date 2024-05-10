import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { QrScanner } from "@/ui/qr-scanner";
import { MatchSubscription } from "@/ui/match-subscription";

export default async function Page() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/login");
  }

  return (
    <>
      <section>
        <QrScanner />
        <MatchSubscription currentUserId={user.id} />
      </section>
    </>
  );
}
