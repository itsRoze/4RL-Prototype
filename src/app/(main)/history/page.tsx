import { createClient } from "@/lib/supabase/server";
import { Matches } from "@/ui/history/matches";
import { redirect } from "next/navigation";

export default async function Page() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // grab matches

  return (
    <>
      <h1 className="pb-4 text-4xl font-light">Past connections</h1>
      <section className="py-2">
        <Matches authId={user.id} />
      </section>
    </>
  );
}
