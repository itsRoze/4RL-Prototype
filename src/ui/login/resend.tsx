"use client";

import { resendCode } from "@/app/login/actions";

interface Props {
  phone: string;
}

export const Resend: React.FC<Props> = ({ phone }) => {
  return <button onClick={async () => await resendCode(phone)}>Resend</button>;
};
