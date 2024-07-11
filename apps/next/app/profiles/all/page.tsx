import { redirect } from "next/navigation"

import { createClient } from "@/database/client/server"

import { AllProfiles } from "../_components/all-profiles"

export default async function Page() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/")
  }
  return <AllProfiles />
}
