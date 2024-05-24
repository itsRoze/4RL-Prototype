"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { IconBell } from "./icons";
import { Match, Profile } from "@/types/tables";
import { acceptMatch } from "@/lib/actions";
import { useRouter } from "next/navigation";

interface Props {
  authId: string;
}

type MatchRequest = {
  match: Match;
  profile: Profile;
};

const Notification: React.FC<Props> = ({ authId }) => {
  const supabase = createClient();
  const router = useRouter();

  const [notification, setNotification] = useState<MatchRequest>();

  const dismiss = () => {
    console.log("hit");
    if (notification) {
      // log dismiss event
      supabase
        .from("analytic")
        .insert({
          type: "dismiss_match",
          user_auth_id: authId,
          related_user_auth_id: notification.profile.auth_id,
        })
        .then((res) => {
          if (res.error) console.error(res.error);
        });

      setNotification(undefined);
    }
  };

  const accept = async () => {
    if (notification && notification.profile.auth_id) {
      const matchId = notification.match.id;

      setNotification(undefined);
      await acceptMatch(matchId, notification.profile.auth_id);
      router.push(`/match/${matchId}`);
    }
  };

  useEffect(() => {
    // on mount, add subscription
    const subscription = supabase
      .channel("notification")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "match",
          filter: `to_user=eq.${authId}`,
        },
        async (payload) => {
          const newMatch = payload.new as Match;
          if (!newMatch.from_user) return;

          const { data } = await supabase
            .from("profile")
            .select()
            .eq("auth_id", newMatch.from_user)
            .single();
          if (!data) return;

          setNotification({ match: newMatch, profile: data });
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
    <div className="animate-in fixed inset-0 -top-16 z-50 flex overflow-hidden outline-none focus:outline-none">
      <div className="relative mx-auto my-8 w-full max-w-xs md:max-w-sm ">
        <div className="bell relative z-10">
          <div className="bell-border"></div>
          <div className="flex w-full flex-col items-center pt-4">
            <div className="relative font-extralight">
              <i className="btn-bell">
                <IconBell size={24} />
              </i>
              <div className="ml-5 ">
                Received Request. &mdash; {notification.profile.name}
              </div>
            </div>
          </div>
          <div className="relative z-20 flex items-center justify-center gap-6 pt-8 text-sm font-extralight">
            <button onClick={accept}>Accept</button>
            <button onClick={dismiss}>Dismiss</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
