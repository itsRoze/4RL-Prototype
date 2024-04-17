import { createClient } from "@/lib/supabase/server";
import { Loader } from "@/ui/loader";
import { MatchStatus } from "@/ui/profile/match";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function Page({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  if (user.id === params.id) {
    redirect("/");
  }

  return (
    <Suspense
      fallback={
        <div className="w-full h-full flex flex-col justify-center items-center gap-12">
          <div className="">
            <Loader size="small" />
          </div>
        </div>
      }
    >
      <section className="w-full flex-col flex items-center gap-4 pt-12">
        <Name userId={params.id} supabase={supabase} />
        {/* <Answers userId={params.id} supabase={supabase} /> */}
        <MatchStatus currentUserId={user.id} profileId={params.id} />
      </section>
    </Suspense>
  );
}

interface UserProps {
  userId: string;
  supabase: ReturnType<typeof createClient>;
}
async function Name({ userId, supabase }: UserProps) {
  // Fetch the user's name
  const { data, error } = await supabase
    .from("profile")
    .select("name")
    .eq("auth_id", userId)
    .limit(1)
    .single();

  if (error) {
    if (error) console.error(error);
    redirect("/error");
  }

  if (!data.name) {
    return (
      <h1 className="md:text-3xl text-2xl font-extralight text-center">
        This user has has no name
      </h1>
    );
  }

  // see the name ends with 's'
  const nameWithApostrophe = data.name.toLowerCase().endsWith("s")
    ? data.name + "'"
    : data.name + "'s";

  return (
    <h1 className="md:text-3xl text-2xl font-extralight text-center">
      You scanned <span className="font-medium">{nameWithApostrophe}</span> code
    </h1>
  );
}

async function Answers({ userId, supabase }: UserProps) {
  // Fetch answers
  const { data: answers, error: answersError } = await supabase
    .from("answer")
    .select("question_id, response, questionnaire(question)")
    .eq("auth_id", userId);

  if (answersError) {
    console.error(answersError);
    return <div>{answersError.message}</div>;
  }

  if (answers.length === 0) {
    return (
      <h1 className="text-xl font-extralight text-center">
        Oops, couldn&apos;t find any answers
      </h1>
    );
  }

  return <pre className="text-wrap">{JSON.stringify(answers, null, 2)}</pre>;
}
