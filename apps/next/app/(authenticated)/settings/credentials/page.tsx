import { redirect } from "next/navigation"

import { CredentialsForm } from "@/components/user/credentials-form"

import { createClient } from "@/modules/utils/server"

export default async function Page() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user?.email) {
    redirect("/login")
  }

  return <CredentialsForm userEmail={user.email} />
}
