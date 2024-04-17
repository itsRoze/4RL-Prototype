"use client";

import { getQA } from "@/lib/actions";
import { Answer, Profile, Questionnaire } from "@/types/tables";
import { useEffect, useState } from "react";
import { Button } from "../button";
import { getRandomMatchmakingLine } from "@/utils/matchmaking";

interface Props {
  currentUserId: string;
  matchId: string;
}

interface Response {
  answer: Answer;
  profile: Profile;
  questionnaire: Questionnaire;
}

export const Reveal: React.FC<Props> = ({ matchId, currentUserId }) => {
  const [responses, setResponses] = useState<Response[]>();
  const [revealed, setRevealed] = useState(false);
  const [showMatchScore, setShowMatchScore] = useState(false);

  useEffect(() => {
    getQA(matchId).then((data) => {
      if (!data || data.length < 2) return;
      setResponses(data);
    });
  }, [matchId]);

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
      {revealed && !showMatchScore ? (
        <Button
          size="medium"
          title="Matchmaking Score"
          onClick={() => setShowMatchScore(true)}
        />
      ) : null}
      {showMatchScore ? (
        <p className="md:text-3xl text-2xl font-medium text-center">
          {getRandomMatchmakingLine()}
        </p>
      ) : null}
    </>
  );
};
