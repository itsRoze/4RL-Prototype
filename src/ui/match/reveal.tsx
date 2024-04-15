"use client";

import { getQA } from "@/lib/actions";
import { createClient } from "@/lib/supabase/client";
import { Answer, Profile, Questionnaire } from "@/types/tables";
import { useEffect, useState } from "react";

interface Props {
  currentUserId: string;
  notificationId: string;
}

interface Response {
  answer: Answer;
  profile: Profile;
  questionnaire: Questionnaire;
}

export const Reveal: React.FC<Props> = ({ notificationId }) => {
  const supabase = createClient();
  const [responses, setResponses] = useState<Response[]>();

  useEffect(() => {
    getQA(notificationId).then((data) => {
      if (!data || data.length < 2) return;
      setResponses(data);
    });
  }, [notificationId]);

  return (
    <>
      <pre>{JSON.stringify(responses, null, 2)}</pre>
    </>
  );
};
