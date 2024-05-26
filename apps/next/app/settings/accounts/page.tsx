import { redirect } from "next/navigation"

import { Accounts } from "@/components/user/settings/accounts"

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
    redirect("/settings")
  }

  return <Accounts userId={user.id} />
}
