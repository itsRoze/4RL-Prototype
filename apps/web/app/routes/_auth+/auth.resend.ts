import { ActionFunctionArgs } from "@remix-run/node";
import { resendCode } from "~/utils/auth.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const { ...values } = Object.fromEntries(formData);
  const { error } = await resendCode(String(values.phone), request);
  return {
    error,
    resend: {
      ok: error ? false : true,
    },
  };
};
