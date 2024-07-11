import { redirect } from "next/navigation"

import { createClient } from "@/database/client/server"

import { OTPAccess } from "../../_components/otp-access"

export default async function Page() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect("/auth")
  }

  return <OTPAccess />
}
