import { createClient } from "@/lib/supabase/server";
import { Button } from "@/ui/button";
import { redirect } from "next/navigation";

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
      <form className="text-2xl font-extralight py-2 space-y-4 px-1">
        {data.map((q) => (
          <Input key={q.id} id={q.id} question={q.question} />
        ))}
        <div className="w-full flex justify-end px-1 py-4">
          <Button
            className="float-right"
            type="submit"
            title="Cool, I'm done"
          />
        </div>
      </form>
    </>
  );
}

interface InputProps {
  id: number;
  question: string;
}

const Input: React.FC<InputProps> = ({ id, question }) => {
  return (
    <div className="space-y-2">
      <label>
        {id} - {question}
      </label>
      <input
        type="text"
        placeholder="Answer..."
        className="text-xl py-2 px-1 border border-black w-full flex-1 bg-transparent focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 rounded-none"
        required
      />
    </div>
  );
};
