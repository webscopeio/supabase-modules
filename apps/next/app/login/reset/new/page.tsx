import { redirect } from "next/navigation"

import { ResetPasswordConfirmForm } from "@/components/user/login/reset/reset-password-confirm-form"

import { createClient } from "@/modules/utils/server"

export default async function Page() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  return <ResetPasswordConfirmForm />
}
