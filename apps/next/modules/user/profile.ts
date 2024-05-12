"use server"

import { redirect as _redirect, type RedirectType } from "next/navigation"

import { Database } from "@/modules/types"
import { createClient } from "@/modules/utils/server"

type Profile = Database["public"]["Tables"]["profiles"]["Row"]

type ServerError = {
  error: { message: string }
}

// #region getProfile
export async function getProfile({
  id,
}: {
  id: string
}): Promise<Profile | null | ServerError> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single()

  if (error) return { error: { message: error.message } }
  return data
}
// #endregion getProfile

type WithRedirect<TArg = unknown> = TArg & {
  redirect?: {
    url?: string
    type?: RedirectType
  }
}

// #region updateProfile
export async function updateProfile(
  options: WithRedirect<Partial<Profile>>
): Promise<ServerError | void> {
  const { redirect, ...updates } = options
  if (!updates.id) {
    return {
      error: { message: "Attempt error - an error occurred with your update" },
    }
  }
  const supabase = createClient()
  const { error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", updates.id)

  if (error) return { error: { message: error.message } }
  redirect?.url && _redirect(redirect.url, redirect.type)
}
// #endregion updateProfile
