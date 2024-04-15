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
    console.log("added");
    // Add notification
    addNotification(currentUserId, profileId).then((notification) => {
      if (!notification) return;
      setStatus(notification.status);
    });

    // Subscribe to the Notification status
    const subscription = supabase
      .channel("notifcation")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "notification",
          filter: `from_user=eq.${currentUserId}`,
        },
        (payload) => {
          console.log(payload);
          const newNotification = payload.new as Notifcation;
          if (newNotification.to_user !== profileId) return;

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
