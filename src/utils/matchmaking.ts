export const matchmakingLines = [
  "Oof, one thing is for sure. Y’all should never be roommates",
  "Soulmates during the apocalypse",
  "You may have just met your worst enemy",
];

export const getRandomMatchmakingLine = () => {
  return matchmakingLines[Math.floor(Math.random() * matchmakingLines.length)];
};
