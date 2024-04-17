"use client";

import { getQA } from "@/lib/actions";
import { Answer, Profile, Questionnaire } from "@/types/tables";
import { useEffect, useState } from "react";
import { Button } from "../button";

interface Props {
  currentUserId: string;
  notificationId: string;
}

interface Response {
  answer: Answer;
  profile: Profile;
  questionnaire: Questionnaire;
}

export const Reveal: React.FC<Props> = ({ notificationId, currentUserId }) => {
  const [responses, setResponses] = useState<Response[]>();
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    getQA(notificationId).then((data) => {
      if (!data || data.length < 2) return;
      setResponses(data);
    });
  }, [notificationId]);

  if (!responses) return null;

  return (
    <>
      <h1 className="md:text-3xl text-2xl font-extralight text-center">
        {responses[0].questionnaire.question}
      </h1>
      {revealed ? (
        <ul className="md:text-3xl text-2xl font-medium text-center space-y-4">
          <li>
            {responses[0].profile.name}: {responses[0].answer.response}
          </li>
          <li>
            {responses[1].profile.name}: {responses[1].answer.response}
          </li>
        </ul>
      ) : (
        <Button
          size="medium"
          title="Reveal Their Answer"
          onClick={() => setRevealed(true)}
        />
      )}
    </>
  );
};
