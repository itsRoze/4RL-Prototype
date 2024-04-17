import { createClient } from "@/lib/supabase/server";
import { Reveal } from "@/ui/match/reveal";
import { redirect } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <section className="flex flex-col gap-6 md:pt-0 pt-12 items-center">
      <Reveal notificationId={params.id} currentUserId={user.id} />
    </section>
  );
}
