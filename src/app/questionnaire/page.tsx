import { createClient } from "@/lib/supabase/server";
import Notification from "@/ui/notification";
import SignoutBtn from "@/ui/signout-button";
import { redirect } from "next/navigation";

export default async function Page() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="">
      <p>Questionnaire</p>
      <Notification authId={user.id} />
      <SignoutBtn />
    </main>
  );
}
