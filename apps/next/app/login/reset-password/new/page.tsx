import { redirect } from "next/navigation"

import { NewResetPasswordForm } from "@/components/user/new-reset-password-form"

import { createClient } from "@/modules/utils/server"

export default async function Page() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  return <NewResetPasswordForm />
}
