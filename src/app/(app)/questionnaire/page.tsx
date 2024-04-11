import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { QuestionForm } from "@/ui/questionnaire/form";

export default async function Page() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // grab questions
  const { data } = await supabase.from("questionnaire").select("id, question");

  if (!data) {
    console.error("No questions found");
    redirect("/error");
  }
  return (
    <>
      <h1 className="text-4xl font-light pb-4">
        Take a moment to share yourself with this community.
      </h1>
      <p className="font-extralight pb-4">Keep your answers short and sweet</p>
      <QuestionForm questions={data} />
    </>
  );
}
