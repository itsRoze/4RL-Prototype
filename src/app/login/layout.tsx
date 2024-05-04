import { Tagline } from "@/ui/tagline";
import Image from "next/image";

export default async function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex h-full w-full flex-col items-center gap-8 pt-20">
      <header className="flex flex-col items-center gap-4">
        <div className="h-auto w-48">
          <Image
            src="/logo.svg"
            alt="4RL Logo"
            width={300}
            height={136}
            priority
          />
        </div>
        <Tagline />
      </header>
      <div className="w-full px-3 md:max-w-3xl">{children}</div>
    </main>
  );
}
