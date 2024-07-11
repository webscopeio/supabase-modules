import { redirect } from "next/navigation"

import { createClient } from "@/database/client/server"

import { MagicLinkSignIn } from "../../_components/magic-link-sign-in"

export default async function Page() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect("/auth")
  }

  return <MagicLinkSignIn />
}
