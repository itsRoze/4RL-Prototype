"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { IconBell } from "./icons";
import { Notifcation } from "@/types/tables";

interface Props {
  authId: string;
}

const Notification: React.FC<Props> = ({ authId }) => {
  const [notification, setNotification] = useState<Notifcation | undefined>();

  const dismiss = () => {
    setNotification(undefined);
  };

  const accept = () => {
    setNotification(undefined);
  };

  const supabase = createClient();

  useEffect(() => {
    console.log("in notification useEffect");
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
          setNotification(payload.new as Notifcation);
        },
      )
      .subscribe();

    // on unmount, remove subscription
    return () => {
      subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authId]);

  if (!notification) {
    return null;
  }

  return (
    <div className="flex overflow-auto fixed inset-0 z-50 outline-none focus:outline-none animate-in">
      <div className="relative w-full max-w-xs md:max-w-sm mx-auto my-8 ">
        <div className="px-2 py-4 border border-black shadow-sm shadow-black relative flex flex-col w-full bg-[#FEFBF5] outline-none focus:outline-none">
          <div className="font-extralight flex gap-1 items-center justify-center">
            <div className="animate-pulse">
              <IconBell size={24} />
            </div>
            <p>Received Request. &mdash; Name</p>
          </div>
          <div className="flex items-center justify-center pt-8 pb-4 gap-6 font-extralight text-sm">
            <button onClick={accept}>Accept</button>
            <button onClick={dismiss}>Dismiss</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
