import Image from "next/image";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-full md:max-w-3xl pt-1 pb-8 overflow-auto md:px-0 px-2">
      <header className="pb-8 w-full">
        <div className="w-20 h-auto">
          <Image
            src="/logo.svg"
            alt="4RL Logo"
            width={300}
            height={136}
            priority
          />
        </div>
      </header>
      <div className="w-full animate-in">{children}</div>
    </main>
  );
}
