import {
  type MetaFunction,
  type ActionFunctionArgs,
  json,
  redirect,
} from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { Button } from "~/components/button";
import ErrorCallout from "~/components/error-callout";
import { sendCode } from "~/utils/auth.server";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const { error, phone } = await sendCode(request);
  if (error) {
    return json({ error });
  } else {
    return redirect("/verify?phone=" + phone);
  }
};

export default function Index() {
  const actionData = useActionData<typeof action>();

  return (
    <Form
      method="POST"
      className="flex flex-col items-center gap-20 font-extralight"
    >
      <div className="w-full">
        <div className="flex w-full items-center gap-2 border border-black px-2 py-4 text-2xl">
          <span>+1</span>
          <span className="text-gray-400">US</span>
          <input
            type="tel"
            placeholder="Phone"
            required
            name="phone"
            className="focus-visible:ring-ring w-11/12 flex-1 bg-transparent focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
        <div className="h-8">
          {actionData?.error ? (
            <ErrorCallout message={actionData.error} />
          ) : null}
        </div>
      </div>
      <TextCodeButton />
    </Form>
  );
}

const TextCodeButton = () => {
  return <Button type="submit" title="Text Code" />;
};