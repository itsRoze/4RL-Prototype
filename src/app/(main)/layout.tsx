import { Header } from "@/ui/header/header";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex h-full w-full flex-col overflow-auto px-2 pb-8 pt-1 md:max-w-3xl md:px-0">
      <Header />
      <div className="animate-in w-full grow">{children}</div>
    </main>
  );
}
