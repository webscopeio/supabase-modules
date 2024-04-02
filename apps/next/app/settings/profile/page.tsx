import { redirect } from "next/navigation"

import { ProfileForm } from "@/components/user/profile-form"

import { createClient } from "@/modules/utils/server"

export default async function Page() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  return <ProfileForm userId={user.id} />
}
