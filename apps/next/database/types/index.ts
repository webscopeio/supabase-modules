import type { RedirectType } from "next/navigation"

import { Database } from "./supabase"

export type WithRedirect<TArg = unknown> = TArg & {
  redirect?: {
    url?: string
    type?: RedirectType
  }
}

export type ServerError = {
  error: { message: string }
}

export type PartialExcept<T, K extends keyof T> = Partial<Omit<T, K>> &
  Pick<T, K>

export type Profile = Database["public"]["Tables"]["profiles"]["Row"]
