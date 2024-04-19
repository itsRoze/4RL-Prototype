"use client";

import { getQA } from "@/lib/actions";
import { Answer, Match, Profile, Questionnaire } from "@/types/tables";
import { useEffect, useState } from "react";
import { Button } from "../button";

interface Props {
  matchId: string;
}

interface Response {
  profileName: Profile["name"];
  question: Questionnaire["question"];
  response: Answer["response"];
  score: Match["matchmaking_score"];
}

export const Reveal: React.FC<Props> = ({ matchId }) => {
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
        {responses[0].question}
      </h1>
      {revealed ? (
        <ul className="md:text-3xl text-2xl font-medium text-center space-y-4">
          <li>
            {responses[0].profileName}: {responses[0].response}
          </li>
          <li>
            {responses[1].profileName}: {responses[1].response}
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
          {responses[0].score}
        </p>
      ) : null}
    </>
  );
};
