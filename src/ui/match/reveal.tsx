"use client";

import { getQA } from "@/lib/actions";
import { Answer, Match, Profile, Questionnaire } from "@/types/tables";
import { useEffect, useState } from "react";
import { Button } from "../button";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Ellipsis } from "../loader";

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
  const [startComputing, setStartComputing] = useState(false);
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

      setStartComputing(true);
    }
  };

  useEffect(() => {
    let timer;
    if (startComputing) {
      timer = setTimeout(() => {
        setStartComputing(false);
        setShowMatchScore(true);
      }, 4000); // Set timeout for 4 seconds
    }
  }, [startComputing]);

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
      {revealed && !startComputing && !showMatchScore ? (
        <Button
          size="medium"
          title="Compute vibeability"
          onClick={revealScore}
        />
      ) : null}
      {startComputing ? (
        <div className="flex gap-1">
          <p className="font-extralight italic">Talking to the AI wizards</p>
          <Ellipsis />
        </div>
      ) : null}
      {showMatchScore ? (
        <p className="text-center text-2xl font-extralight md:text-3xl">
          Vibeability: <span className="italic">{response.score}</span>
        </p>
      ) : null}
    </>
  );
};
