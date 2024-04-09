import { Button } from "@/ui/button";
import PhoneInput from "@/ui/login/phoneinput";
import { sendCode } from "./actions";

export default async function Signup() {
  return (
    <form
      action={sendCode}
      className="font-extralight flex flex-col items-center gap-40"
    >
      <div className="text-2xl py-4 px-2 border border-black flex gap-2 items-center w-full">
        <span>+1</span>
        <span className="text-gray-400">US</span>
        <PhoneInput />
      </div>
      <Button type="submit" title="Text Code" />
    </form>
  );
}
