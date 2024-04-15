"use client";

import { addNotification } from "@/lib/actions";
import { createClient } from "@/lib/supabase/client";
import { Notifcation } from "@/types/tables";
import { useEffect, useState } from "react";

interface Props {
  currentUserId: string;
  profileId: string;
}

export const MatchStatus: React.FC<Props> = ({ currentUserId, profileId }) => {
  const [status, setStatus] = useState("pending");

  const supabase = createClient();

  useEffect(() => {
    // Add notification
    addNotification(currentUserId, profileId);

    // Subscribe to the Notification status
    const subscription = supabase
      .channel("notifcation")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "notification",
          filter: `to_user=eq.${profileId} from_user=eq.${currentUserId}`,
        },
        (payload) => {
          const newNotification = payload.new as Notifcation;
          setStatus(newNotification.status);
        },
      )
      .subscribe();

    // on unmount, remove subscription
    return () => {
      subscription.unsubscribe();
    };
  });

  return <div>Match status: {status}</div>;
};
