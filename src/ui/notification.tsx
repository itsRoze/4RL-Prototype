"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

interface Props {
  authId: string;
}

const Notification: React.FC<Props> = ({ authId }) => {
  console.log("authId", authId);
  const [notification, setNotification] = useState<Notification>(); // [

  const dismiss = () => {
    setNotification(undefined);
  };

  const supabase = createClient();

  useEffect(() => {
    // on mount, add subscription
    const subscription = supabase
      .channel("notifcation")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notification",
          filter: `to_user=eq.${authId}`,
        },
        (payload) => {
          setNotification(payload.new as Notification);
        },
      )
      .subscribe();

    // on unmount, remove subscription
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div>
      {notification ? (
        <>
          <pre>{JSON.stringify(notification, null, 2)}</pre>
          <button onClick={dismiss}>dismiss</button>
        </>
      ) : null}
    </div>
  );
};

export default Notification;
