import type { SupabaseClient } from "@supabase/supabase-js";
import * as React from "react";
import { createBrowserClient } from "@supabase/ssr";

import type { Database } from "../types/database";

export const useSupabaseClient = (): SupabaseClient<Database> =>
  React.useMemo(
    () =>
      createBrowserClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      ),
    [],
  );
