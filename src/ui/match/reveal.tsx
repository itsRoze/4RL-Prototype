"use client";

import { getQA } from "@/lib/actions";
import { createClient } from "@/lib/supabase/client";
import { useEffect } from "react";

interface Props {
  currentUserId: string;
  notificationId: string;
}

export const Reveal: React.FC<Props> = ({ notificationId }) => {
  const supabase = createClient();

  useEffect(() => {
    getQA(notificationId);
  });

  return <></>;
};
