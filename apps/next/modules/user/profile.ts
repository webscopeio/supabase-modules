"use server";

import { createClient } from "../utils/server";
import { Database } from "@/modules/types";
import { redirect as _redirect, type RedirectType } from "next/navigation";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];

// #region getProfile
export async function getProfile({
  id,
}: {
  id: string;
}): Promise<Profile | null> {
  const supabase = createClient();
  return supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single()
    .throwOnError()
    .then(({ data }) => data);
}
// #endregion getProfile

type WithRedirect<TArg = unknown> = TArg & {
  redirect?: {
    url?: string;
    type?: RedirectType;
  };
};

// #region updateProfile
export async function updateProfile(
  options: WithRedirect<Partial<Profile>>
): Promise<void> {
  const { redirect, ...updates } = options;
  if (!updates.id) {
    throw new Error("Attempt error - an error occurred with your update");
  }
  const supabase = createClient();
  await supabase
    .from("profiles")
    .update(updates)
    .eq("id", updates.id)
    .throwOnError();
  redirect?.url && _redirect(redirect.url, redirect.type);
}
// #endregion updateProfile
