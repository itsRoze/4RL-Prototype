import { CameraBtn } from "@/ui/cameraBtn";
import { HomeBtn } from "@/ui/homeBtn";
import SignoutBtn from "@/ui/signout-button";
import Image from "next/image";
import Link from "next/link";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex h-full w-full flex-col overflow-auto px-2 pb-8 pt-1 md:max-w-3xl md:px-0">
      <header className="flex w-full items-center justify-between pb-8">
        <Link href="/" className="h-auto w-20">
          <Image
            src="/logo.svg"
            alt="4RL Logo"
            width={300}
            height={136}
            priority
          />
        </Link>
        <div className="flex gap-4">
          <HomeBtn />
          <CameraBtn />
          <SignoutBtn />
        </div>
      </header>
      <div className="animate-in w-full grow">{children}</div>
    </main>
  );
}
