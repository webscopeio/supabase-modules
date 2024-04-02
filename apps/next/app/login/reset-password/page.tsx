import { redirect } from "next/navigation"

import { ResetPasswordForm } from "@/components/user/reset-password-form"

import { createClient } from "@/modules/utils/server"

export default async function Page() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect("/settings/accounts")
  }

  return <ResetPasswordForm />
}
