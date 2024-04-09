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
    <main className="">
      <p>Home</p>
      <SignoutBtn />
    </main>
  );
}
