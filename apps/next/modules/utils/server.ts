import { createServerClient } from "@supabase/ssr";
import type { Database } from "../types";

type Cookies = () => {
  get: (name: string) => { value: string } | undefined;
};

export const useSupabaseServer = ({
  cookies,
}: {
  cookies: Cookies;
}): ReturnType<typeof createServerClient<Database>> =>
  createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name) => cookies().get(name)?.value,
      },
    }
  );
