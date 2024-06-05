import { LoaderFunctionArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { createClient } from "~/lib/supabase/server";
import { requireUser } from "~/utils/auth.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { supabase, headers } = await createClient(request);
  await requireUser(supabase);

  return new Response(null, {
    headers,
  });
};

export default function Home() {
  return (
    <>
      <h1>Home page</h1>
      <Logout />
    </>
  );
}

const Logout = () => {
  return (
    <Form method="post" action="/auth/logout">
      <button type="submit">Logout</button>
    </Form>
  );
};
