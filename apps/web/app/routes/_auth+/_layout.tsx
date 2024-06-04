import { LoaderFunctionArgs } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { Tagline } from "~/components/tagline";
import { createClient } from "~/lib/supabase/server";
import { requireAnonymous } from "~/utils/auth.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { supabase, headers } = await createClient(request);
  await requireAnonymous(supabase);

  return new Response(null, {
    headers,
  });
};

export default function AuthLayout() {
  return (
    <main className="flex h-full w-full flex-col items-center gap-8 pt-20">
      <header className="flex w-full flex-col items-center gap-4">
        <img
          src="/logo.svg"
          alt="4RL Logo"
          width={300}
          height={136}
          className="h-auto w-40"
        />
        <Tagline />
      </header>
      <div className="w-full px-3 md:max-w-3xl">
        <Outlet />
      </div>
    </main>
  );
}
