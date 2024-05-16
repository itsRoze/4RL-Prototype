export const matchmakingLines = [
  "Soulmates during the apocalypse",
  "You may have just met your arch nemesis",
  "You both cause the apocalypse together",
  "You start a band together and go on a world tour",
  "You end up sharing a cell in a Mexican prison",
  "You form a cult together",
  "You both end up on the FBI watchlist",
  "For one to live the other must die",
  "This person is your key to an early retirement",
];

export const getRandomMatchmakingLine = () => {
  return matchmakingLines[Math.floor(Math.random() * matchmakingLines.length)];
};
