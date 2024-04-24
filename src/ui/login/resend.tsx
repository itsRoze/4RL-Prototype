import { resendCode } from "@/app/login/actions";
import { useState } from "react";

interface Props {
  phone: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

export const Resend: React.FC<Props> = ({ phone, setError }) => {
  const [sent, setSent] = useState(false);

  const handleResend = async () => {
    const res = await resendCode(phone);
    if (res) {
      setError(res.message);
    } else {
      setSent(true);
    }
  };

  if (sent) {
    return <p className="font-medium">Sent!</p>;
  }
  return (
    <button className="underline" onClick={handleResend}>
      Resend
    </button>
  );
};
