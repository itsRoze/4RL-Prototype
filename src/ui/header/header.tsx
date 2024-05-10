import { CameraBtn } from "@/ui/header/cameraBtn";
import { HomeBtn } from "@/ui/header/homeBtn";
import { MatchesBtn } from "@/ui/header/matchesBtn";
import SignoutBtn from "@/ui/header/signout-button";
import Image from "next/image";
import Link from "next/link";

export const Header: React.FC = () => {
  return (
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
        <MatchesBtn />
        <SignoutBtn />
      </div>
    </header>
  );
};
