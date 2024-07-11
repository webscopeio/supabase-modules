import { redirect } from "next/navigation"

import { createClient } from "@/database/client/server"

import { Update } from "../_components/update"

export default async function Page() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth")
  }

  return <Update />
}
