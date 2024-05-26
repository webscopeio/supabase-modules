import { redirect } from "next/navigation"

import { OtpLoginForm } from "@/components/user/login/otp/otp-login-form"

import { createClient } from "@/modules/utils/server"

export default async function Page() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect("/settings")
  }

  return <OtpLoginForm />
}
