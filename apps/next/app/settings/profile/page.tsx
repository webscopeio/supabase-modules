import { redirect } from "next/navigation"

import { ProfileForm } from "@/components/user/settings/profile-form"

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

  return <ProfileForm userId={user.id} />
}
