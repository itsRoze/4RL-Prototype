import {
  type MetaFunction,
  type LoaderFunctionArgs,
  type ActionFunctionArgs,
  redirect,
  json,
} from "@remix-run/node";
import { Form, Link, useActionData, useLoaderData } from "@remix-run/react";
import { Button } from "~/components/button";
import ErrorCallout from "~/components/error-callout";
import { Loader } from "~/components/loader";
import { resendCode, verifyCode } from "~/utils/auth.server";
import { formatPhoneForClient } from "~/utils/formatPhoneNumber";
import { useIsPending } from "~/utils/hooks";

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
  const formData = await request.formData();
  const { _action, ...values } = Object.fromEntries(formData);
  if (_action === "resend") {
    const { error } = await resendCode(String(values.phone), request);
    return {
      error,
      ok: error ? false : true,
    };
  }

  if (_action === "submit") {
    await verifyCode();
    return null;
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
      <TokenForm />
    </>
  );
}

interface ResendProps {
  phone: string;
}
const Resend: React.FC<ResendProps> = ({ phone }) => {
  const actionData = useActionData<typeof action>();

  if (actionData?.ok) {
    return <p className="font-medium">Sent!</p>;
  }

  return (
    <Form method="POST">
      <input type="hidden" name="phone" value={phone} />
      <button type="submit" name="_action" value="resend" className="underline">
        Resend
      </button>
    </Form>
  );
};

const TokenForm = () => {
  const actionData = useActionData<typeof action>();

  const isPending = useIsPending();
  return (
    <Form
      method="POST"
      className="flex flex-col items-center gap-40 font-extralight"
    >
      <div className="w-full">
        <div className="flex w-full items-center gap-2 border border-black px-2 py-4 text-2xl">
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
        <Button
          type="submit"
          name="_action"
          disabled={isPending}
          value="submit"
          title="Take me in"
        />
      )}
    </Form>
  );
};
