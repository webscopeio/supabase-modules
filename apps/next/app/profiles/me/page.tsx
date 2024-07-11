import { redirect } from "next/navigation"

import { createClient } from "@/database/client/server"

import { UserProfile } from "../_components/user-profile"

export default async function Page() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user || user.is_anonymous) {
    redirect("/")
  }
  return <UserProfile userId={user.id} />
}
