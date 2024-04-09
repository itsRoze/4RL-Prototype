import Image from "next/image";

export default async function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col w-full gap-8 items-center h-full pt-20">
      <header className="flex flex-col gap-4 items-center">
        <div className="w-48 h-auto">
          <Image
            src="/logo.svg"
            alt="4RL Logo"
            width={300}
            height={136}
            priority
          />
        </div>
        <h2 className="font-extralight text-lg">A community app</h2>
      </header>
      <div className="w-full px-3 md:max-w-3xl">{children}</div>
    </main>
  );
}
