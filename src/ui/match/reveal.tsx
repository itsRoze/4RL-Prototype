"use client";

import { getQA } from "@/lib/actions";
import { Answer, Match, Profile, Questionnaire } from "@/types/tables";
import { useEffect, useState } from "react";
import { Button } from "../button";
import { createClient } from "@/lib/supabase/client";

interface Props {
  matchId: string;
  authId: string;
}

interface Response {
  authId: Profile["auth_id"];
  profileName: Profile["name"];
  question: Questionnaire["question"];
  response: Answer["response"];
  score: Match["matchmaking_score"];
}

export const Reveal: React.FC<Props> = ({ matchId, authId }) => {
  const [responses, setResponses] = useState<Response[]>();
  const [revealed, setRevealed] = useState(false);
  const [showMatchScore, setShowMatchScore] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    getQA(matchId).then((data) => {
      if (!data || data.length < 2) return;
      setResponses(data);
    });
  }, [matchId]);

  const revealAnswers = () => {
    if (responses) {
      supabase
        .from("analytic")
        .insert({
          type: "reveal_answer",
          user_auth_id: authId,
          related_user_auth_id:
            responses[0].authId === authId
              ? responses[1].authId
              : responses[0].authId,
        })
        .then((res) => {
          if (res.error) {
            console.error("Error logging revealing answers", res.error);
          }
        });

      setRevealed(true);
    }
  };

  const revealScore = () => {
    if (responses) {
      supabase
        .from("analytic")
        .insert({
          type: "reveal_score",
          user_auth_id: authId,
          related_user_auth_id:
            responses[0].authId === authId
              ? responses[1].authId
              : responses[0].authId,
        })
        .then((res) => {
          if (res.error) {
            console.error("Error logging revealing score", res.error);
          }
        });

      setShowMatchScore(true);
    }
  };

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
        <Button size="medium" title="Reveal answers" onClick={revealAnswers} />
      )}
      {revealed && !showMatchScore ? (
        <Button size="medium" title="Matchmaking Score" onClick={revealScore} />
      ) : null}
      {showMatchScore ? (
        <p className="md:text-3xl text-2xl font-medium text-center">
          {responses[0].score}
        </p>
      ) : null}
    </>
  );
};
