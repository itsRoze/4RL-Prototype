import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";

const lexend = Lexend({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "4RL | The Community App",
  description: "4RL",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${lexend.className} gradient-bg flex h-[100svh] w-full flex-col items-center`}
      >
        {children}
      </body>
    </html>
  );
}
