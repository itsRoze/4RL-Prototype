import { Tables } from "./types/database-types";
export { Database } from "./types/database-types";

export type Profile = Tables<"profile">;
export type Match = Tables<"match">;
export type Questionnaire = Tables<"questionnaire">;
export type Answer = Tables<"answer">;
