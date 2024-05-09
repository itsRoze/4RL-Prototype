"use client";

import { getMatchHistory } from "@/app/(main)/history/actions";
import { useEffect, useState } from "react";

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

  if (!connections || !connections.length) {
    return (
      <div className="space-y-2 font-light">
        <p>Looks like you haven&apos;t connected with anyone yet</p>
        <p>Go out there and meet new people!</p>
      </div>
    );
  }
  return (
    <>
      <pre>{JSON.stringify(connections, null, 2)}</pre>
    </>
  );
};
