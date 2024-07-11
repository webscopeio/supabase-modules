import { redirect } from "next/navigation"

import { createClient } from "@/database/client/server"

import { Reset } from "../_components/reset"

export default async function Page() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect("/auth")
  }

  return <Reset />
}
