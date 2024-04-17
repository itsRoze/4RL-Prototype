"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { IconBell } from "./icons";
import { Notifcation, Profile } from "@/types/tables";
import {
  acceptNotification,
  getRecentPendingNotification,
} from "@/lib/actions";
import { useRouter } from "next/navigation";

interface Props {
  authId: string;
}

type MatchRequest = {
  notification: Notifcation;
  profile: Profile;
};

const Notification: React.FC<Props> = ({ authId }) => {
  const router = useRouter();

  const [match, setMatch] = useState<MatchRequest>();

  const dismiss = () => {
    setMatch(undefined);
  };

  const accept = async () => {
    if (match) {
      const notificationId = match.notification.id;

      setMatch(undefined);
      await acceptNotification(notificationId);
      router.push(`/match/${notificationId}`);
    }
  };

  const supabase = createClient();

  useEffect(() => {
    // Get last notification
    getRecentPendingNotification(authId).then((notification) => {
      if (notification) {
        setMatch(notification);
      }
    });

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
        async (payload) => {
          const newNotification = payload.new as Notifcation;
          if (!newNotification.from_user) return;

          const { data } = await supabase
            .from("profile")
            .select()
            .eq("auth_id", newNotification.from_user)
            .single();
          if (!data) return;

          setMatch({ notification: newNotification, profile: data });
        },
      )
      .subscribe();

    // on unmount, remove subscription
    return () => {
      subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authId]);

  if (!match) {
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
            <p>Received Request. &mdash; {match.profile.name}</p>
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
