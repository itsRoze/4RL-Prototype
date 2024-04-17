import { Tables } from "./supabase";

export type Profile = Tables<"profile">;
export type Match = Tables<"match">;
export type Questionnaire = Tables<"questionnaire">;
export type Answer = Tables<"answer">;
