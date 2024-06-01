import { Database } from "@beta/supabase";
import { createServerClient, parse, serialize } from "@supabase/ssr";
import { Resource } from "sst";

export async function createClient(request: Request) {
  const cookies = parse(request.headers.get("Cookie") ?? "");
  const headers = new Headers();

  const supabase = createServerClient<Database>(
    Resource.SupabaseUrl.value,
    Resource.SupabaseAnonKey.value,
    {
      cookies: {
        get(key) {
          return cookies[key];
        },
        set(key, value, options) {
          headers.append("Set-Cookie", serialize(key, value, options));
        },
        remove(key, options) {
          headers.append("Set-Cookie", serialize(key, "", options));
        },
      },
    },
  );

  return { supabase, headers };
}
