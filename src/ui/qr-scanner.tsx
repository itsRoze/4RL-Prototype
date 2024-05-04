"use client";

import { QrReader } from "react-qr-reader";

export const QrScanner = () => {
  return <QrReader constraints={{ facingMode: "environment" }} />;
};
