import { redirect } from "next/navigation"

import { GuestForm } from "@/components/user/settings/guest-form"

import { createClient } from "@/modules/utils/server"

export default async function Page() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  if (user.is_anonymous) {
    return <GuestForm />
  }

  redirect("/settings/accounts")
}
