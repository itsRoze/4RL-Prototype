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
        className={`${lexend.className} h-[100svh] bg-gradient-to-r from-purple-200/75 to-purple-50`}
      >
        {children}
      </body>
    </html>
  );
}
