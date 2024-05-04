"use client";

import { QrReader } from "react-qr-reader";
import { useRouter } from "next/navigation";

export const QrScanner = () => {
  const router = useRouter();
  return (
    <QrReader
      constraints={{ facingMode: "environment" }}
      onResult={(result, error) => {
        if (error) {
          console.info(error);
        } else if (result) {
          const resultText = result.getText();
          const parts = resultText.split("/");

          // Extract the user ID (last part of the URL)
          const userId = parts[parts.length - 1];
          if (!userId) return;

          router.push("/profile/" + userId);
        }
      }}
    />
  );
};
