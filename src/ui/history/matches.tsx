"use client";

import { getMatchHistory } from "@/app/(main)/history/actions";
import { useEffect, useState } from "react";
import { Loader } from "../loader";
import clsx from "clsx";
import Link from "next/link";

interface Props {
  authId: string;
}

type History = Awaited<ReturnType<typeof getMatchHistory>>;

export const Matches: React.FC<Props> = ({ authId }) => {
  const [connections, setConnections] = useState<History>();
  useEffect(() => {
    getMatchHistory(authId).then((data) => {
      setConnections(data);
    });
  }, [authId]);

  if (!connections) {
    return (
      <div className="flex justify-center pt-6">
        <Loader />
      </div>
    );
  }

  if (!connections.length) {
    return (
      <div className="space-y-2 font-light">
        <p>Looks like you haven&apos;t connected with anyone yet</p>
        <p>Go out there and meet new people!</p>
      </div>
    );
  }
  return (
    <>
      <section className="w-full">
        {connections.map((match, idx) => (
          <div
            key={match.matchId}
            className={clsx("flex flex-col", {
              "items-end": idx % 2 !== 0,
            })}
          >
            <Link href={`/match/${match.matchId}`} className="w-2/3 py-3">
              <p className="truncate underline underline-offset-2">
                {match.matchedUserName}
              </p>
              <p className="truncate font-extralight italic">{match.score}</p>
            </Link>
          </div>
        ))}
      </section>
    </>
  );
};
