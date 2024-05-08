"use client";

import { getQA } from "@/lib/actions";
import { Answer, Match, Profile, Questionnaire } from "@/types/tables";
import { useEffect, useState } from "react";
import { Button } from "../button";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  const [response, setResponse] = useState<Response>();
  const [revealed, setRevealed] = useState(false);
  const [showMatchScore, setShowMatchScore] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    getQA(matchId, authId).then((data) => {
      if (!data) {
        router.push("/404");
      }
      setResponse(data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchId, authId]);

  const revealAnswers = () => {
    if (response) {
      supabase
        .from("analytic")
        .insert({
          type: "reveal_answer",
          user_auth_id: authId,
          related_user_auth_id: response.authId,
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
    if (response) {
      supabase
        .from("analytic")
        .insert({
          type: "reveal_score",
          user_auth_id: authId,
          related_user_auth_id: response.authId,
        })
        .then((res) => {
          if (res.error) {
            console.error("Error logging revealing score", res.error);
          }
        });

      setShowMatchScore(true);
    }
  };

  if (!response) return null;

  return (
    <>
      <h1 className="text-center text-2xl font-extralight md:text-3xl">
        {response.question}
      </h1>
      {revealed ? (
        <ul className="space-y-4 text-center text-2xl font-extralight md:text-3xl">
          <li>
            <p>
              {response.profileName} said,{" "}
              <span className="italic">
                &#x0022;{response.response}&#x0022;
              </span>
            </p>
          </li>
        </ul>
      ) : (
        <Button size="medium" title="Reveal answer" onClick={revealAnswers} />
      )}
      {revealed && !showMatchScore ? (
        <Button size="medium" title="Matchmaking Score" onClick={revealScore} />
      ) : null}
      {showMatchScore ? (
        <p className="text-center text-2xl font-extralight md:text-3xl">
          {response.score}
        </p>
      ) : null}
    </>
  );
};
