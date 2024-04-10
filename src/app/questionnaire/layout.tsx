import Image from "next/image";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-full pt-1 pb-8 px-3 overflow-auto">
      <header className="pb-8">
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
      {children}
    </main>
  );
}
