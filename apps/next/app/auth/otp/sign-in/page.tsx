import { redirect } from "next/navigation"

import { createClient } from "@/database/client/server"

import { OTPSignIn } from "../../_components/otp-sign-in"

export default async function Page() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect("/auth")
  }

  return <OTPSignIn />
}
