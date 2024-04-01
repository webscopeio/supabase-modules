import { cookies } from "next/headers";
import type { Database } from "../types";
import { type CookieOptions, createServerClient } from "@supabase/ssr";

export function createClient(): ReturnType<
  typeof createServerClient<Database>
> {
  const cookieStore = cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            throw error;
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: "", ...options });
          } catch (error) {
            throw error;
          }
        },
      },
    }
  );
}
