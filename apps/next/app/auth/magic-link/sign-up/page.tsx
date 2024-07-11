import { redirect } from "next/navigation"

import { createClient } from "@/database/client/server"

import { MagicLinkSignUp } from "../../_components/magic-link-sign-up"

export default async function Page() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect("/auth")
  }

  return <MagicLinkSignUp />
}
