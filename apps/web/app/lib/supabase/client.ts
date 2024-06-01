import { createBrowserClient } from "@supabase/ssr";
import { Resource } from "sst";
import { Database } from "@beta/supabase";

export function createClient() {
  return createBrowserClient<Database>(
    Resource.SupabaseUrl.value,
    Resource.SupabaseAnonKey.value,
  );
}
