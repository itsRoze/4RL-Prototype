"use client";

import { ReactTyped } from "react-typed";

export const Tagline: React.FC = () => {
  return (
    <h2 className="text-lg font-extralight">
      <ReactTyped
        strings={[
          "A community app",
          "designed to help you talk to more people",
          "to get out of your comfort zone",
          "to make meaningful connection",
        ]}
        typeSpeed={80}
        backSpeed={60}
        backDelay={1000}
        loop
      />
    </h2>
  );
};
