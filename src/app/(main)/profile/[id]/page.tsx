import { createClient } from "@/lib/supabase/server";
import { Loader } from "@/ui/loader";
import { redirect } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // if (user.id === params.id) {
  //   redirect("/");
  // }

  // Fetch the user's name
  const { data: name, error } = await supabase
    .from("profile")
    .select("name")
    .eq("auth_id", params.id)
    .limit(1)
    .single();

  if (error || !name) {
    if (error) console.error(error);
    redirect("/error");
  }
  console.log(name);

  // Fetch answers
  const { data: answers, error: answersError } = await supabase
    .from("answer")
    .select("question_id, response, questionnaire(question)")
    .eq("auth_id", params.id);

  if (answersError) {
    console.error(answersError);
    return <div>{answersError.message}</div>;
  }

  console.log(answers);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-12">
      <div className="">
        <Loader size="small" />
      </div>
    </div>
  );
}
