import { createClient } from "@/lib/supabase/server";
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
    <div className="">
      <h1 className="text-4xl font-light pb-4">
        Take a moment to share yourself with this community.
      </h1>
      <form className="text-2xl font-extralight py-2 space-y-4">
        <Input question="1 - What's your name" />
        <Input question="2 - You won yourself a condo. In five words, describe the aesthetic " />
        <Input question="3 - The end of world was announced for tomorrow. What are you doing?" />
        <Input question="4 - Name a musician or band that is highly underrated in your opinion" />
      </form>
      <SignoutBtn />
    </div>
  );
}

interface InputProps {
  question: string;
}

const Input: React.FC<InputProps> = ({ question }) => {
  return (
    <div className="space-y-2">
      <label>{question}</label>
      <input
        type="text"
        placeholder="Answer..."
        className="text-xl py-2 px-1 border border-black w-11/12 flex-1 bg-transparent focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 rounded-none"
      />
    </div>
  );
};
