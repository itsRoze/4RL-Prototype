"use client";

import { addMatch } from "@/lib/actions";
import { createClient } from "@/lib/supabase/client";
import { Match } from "@/types/tables";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Ellipsis } from "../loader";

interface Props {
  currentUserId: string;
  profileId: string;
}

export const MatchStatus: React.FC<Props> = ({ currentUserId, profileId }) => {
  const router = useRouter();

  const [status, setStatus] = useState<Match["status"]>("pending");

  const supabase = createClient();

  useEffect(() => {
    // Add notification
    addMatch(currentUserId, profileId).then((match) => {
      if (!match) return;
      if (match.status === "accepted") router.push(`/match/${match.id}`);
      setStatus(match.status);
    });

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
          if (newMatch.to_user !== profileId) return;

          setStatus(newMatch.status);
          if (newMatch.status === "accepted") {
            // Redirect to chat
            router.push(`/match/${newMatch.id}`);
          }
        },
      )
      .subscribe();

    // on unmount, remove subscription
    return () => {
      subscription.unsubscribe();
    };
  });

  if (status === "pending") {
    return (
      <div className="flex items-center gap-1">
        <span>Waiting for match</span>
        <Ellipsis />
      </div>
    );
  }

  return <div>Accepted match!</div>;
};
