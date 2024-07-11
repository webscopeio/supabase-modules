import { cookies } from "next/headers"
import { createServerClient, type CookieOptions } from "@supabase/ssr"

import { env } from "@/lib/env"

import type { Database } from "../types/supabase"

export function createClient(): ReturnType<
  typeof createServerClient<Database>
> {
  const cookieStore = cookies()

  return createServerClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            console.error(error)
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: "", ...options })
          } catch (error) {
            console.error(error)
          }
        },
      },
    }
  )
}
