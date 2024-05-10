"use client";

import { createClient } from "@/lib/supabase/client";
import { Match } from "@/types/tables";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface Props {
  currentUserId: string;
}
export const MatchSubscription: React.FC<Props> = ({ currentUserId }) => {
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    // Subscribe to the Notification status
    const subscription = supabase
      .channel("notification")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "match",
          filter: `from_user=eq.${currentUserId}`,
        },
        (payload) => {
          const newMatch = payload.new as Match;

          if (newMatch.status === "accepted") {
            // Redirect to chat
            router.push("/match/" + newMatch.id);
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [currentUserId]);

  return <></>;
};
