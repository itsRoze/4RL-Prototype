import { createClient } from "@/lib/supabase/server";
import SignoutBtn from "@/ui/signout-button";
import { redirect } from "next/navigation";

export default async function Home() {
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
      <SignoutBtn />
    </main>
  );
}
