import {
  json,
  redirect,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import {
  Form,
  Link,
  useActionData,
  useFetcher,
  useLoaderData,
} from "@remix-run/react";
import { useEffect, useState } from "react";
import { Button } from "~/components/button";
import ErrorCallout from "~/components/error-callout";
import { Loader } from "~/components/loader";
import { verifyCode } from "~/utils/auth.server";
import { formatPhoneForClient } from "~/utils/formatPhoneNumber";
import { useIsPending } from "~/utils/hooks";
import { action as resendAction } from "./auth.resend";
import { createClient } from "~/lib/supabase/server";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const phone = url.searchParams.get("phone");

  if (!phone) {
    throw redirect("/");
  }

  return json({ phone });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const { supabase, headers } = await createClient(request);
  const { error, ok } = await verifyCode(request, supabase);
  if (error) {
    return {
      error,
      resend: {
        ok: false,
      },
    };
  }

  if (ok) {
    return redirect("/home", {
      headers: headers,
    });
  }
};

export default function Index() {
  const { phone } = useLoaderData<typeof loader>();

  return (
    <>
      <div className="flex justify-between py-2 text-sm font-extralight">
        <p className="no-underline">
          Text sent to {formatPhoneForClient(phone)}
        </p>
        <div className="flex gap-2">
          <Resend phone={phone} />
          <Link className="underline" to="/login">
            Change number
          </Link>
        </div>
      </div>
      <TokenForm phone={phone} />
    </>
  );
}

interface ResendProps {
  phone: string;
}
const Resend: React.FC<ResendProps> = ({ phone }) => {
  const fetcher = useFetcher<typeof resendAction>();
  const [isSent, setIsSent] = useState(false);

  useEffect(() => {
    if (fetcher.data?.resend.ok) {
      setIsSent(true);
      const timeout = setTimeout(() => setIsSent(false), 8000);
      return () => clearTimeout(timeout);
    }
  }, [fetcher.data]);

  if (isSent) {
    return <p className="font-medium">Sent!</p>;
  }

  return (
    <fetcher.Form method="POST" action="/auth/resend">
      <input type="hidden" name="phone" value={phone} />
      <button type="submit" className="underline">
        Resend
      </button>
    </fetcher.Form>
  );
};

interface TokenFormProps {
  phone: string;
}

const TokenForm: React.FC<TokenFormProps> = ({ phone }) => {
  const actionData = useActionData<typeof action>();

  const isPending = useIsPending();
  return (
    <Form
      method="POST"
      className="flex flex-col items-center gap-40 font-extralight"
    >
      <div className="w-full">
        <div className="flex w-full items-center gap-2 border border-black px-2 py-4 text-2xl">
          <input type="hidden" name="phone" value={phone} />
          <input
            type="text"
            placeholder="XXXXXX"
            name="token"
            className="focus-visible:ring-ring w-11/12 flex-1 bg-transparent focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50"
            maxLength={6}
          />
        </div>
        {actionData?.error ? <ErrorCallout message={actionData.error} /> : null}
      </div>
      {isPending ? (
        <Loader />
      ) : (
        <Button type="submit" disabled={isPending} title="Take me in" />
      )}
    </Form>
  );
};
