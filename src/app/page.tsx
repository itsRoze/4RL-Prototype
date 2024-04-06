import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = createClient();
  const { data: notes } = await supabase.from("notes").select();

  return (
    <main className="">
      {notes ? (
        <pre>{JSON.stringify(notes, null, 2)}</pre>
      ) : (
        <p>Error connecting Supabase</p>
      )}
    </main>
  );
}
