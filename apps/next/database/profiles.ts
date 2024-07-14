"use server"

import { redirect as _redirect } from "next/navigation"

import { createClient } from "./client/server"
import type { PartialExcept, Profile, ServerError, WithRedirect } from "./types"

// #region getProfile
export async function getProfile({
  id,
}: {
  id: string
}): Promise<Profile | ServerError> {
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

// #region updateProfile
export async function updateProfile(
  options: WithRedirect<PartialExcept<Profile, "id">>
): Promise<ServerError | void> {
  const { redirect, ...updates } = options
  const supabase = createClient()
  const { error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", updates.id)

  if (error) return { error: { message: error.message } }
  redirect?.url && _redirect(redirect.url, redirect.type)
}
// #endregion updateProfile

// #region getAllProfiles
export async function getAllProfiles(): Promise<Profile[] | ServerError> {
  const supabase = createClient()
  const { data, error } = await supabase.from("profiles").select("*")

  if (error) return { error: { message: error.message } }
  return data
}
// #endregion getAllProfiles
