import { redirect } from "next/navigation"

import { createClient } from "@/modules/utils/server"
import { isAnonymousUser } from "@/modules/user/helpers"

export default async function Home() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    isAnonymousUser(user) ? redirect("/guest") : redirect("/settings/accounts")
  }

  redirect("/login")
}
