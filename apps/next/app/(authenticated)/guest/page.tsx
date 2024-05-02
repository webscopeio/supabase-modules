import { redirect } from "next/navigation"

import { GuestForm } from "@/components/user/guest-form"

import { createClient } from "@/modules/utils/server"
import { isAnonymousUser } from "@/modules/user/helpers"

export default async function Page() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user || !isAnonymousUser(user)) {
    redirect("/login")
  }

  return <GuestForm isAnonymousUser={user.is_anonymous ?? false} />
}
