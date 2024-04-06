import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { sendCode, verify } from "./actions";

export default async function Signup() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return redirect("/");
  }

  return (
    <div>
      <form className="flex w-fit items-center justify-center gap-2">
        <label>Phone</label>
        <input
          type="tel"
          name="phone"
          className="py-2 px-4 w-60"
          autoFocus
          required
        />
        <button
          formAction={sendCode}
          className="border border-foreground/20 rounded-md px-4 py-2"
        >
          Send code
        </button>
      </form>
      <form className="flex w-fit items-center justify-center gap-2">
        <label>Code</label>
        <input type="text" name="token" className="py-2 px-4 w-60" required />
        <button
          formAction={verify}
          className="border border-foreground/20 rounded-md px-4 py-2"
        >
          Verify
        </button>
      </form>
    </div>
  );
}
