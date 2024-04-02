import { redirect } from "next/navigation"
import { z } from "zod"

import { OtpLoginForm } from "@/components/user/otp-login-form"

import { createClient } from "@/modules/utils/server"

const emailSchema = z.object({
  email: z.string().email(),
})

export default async function Page({
  searchParams,
}: {
  searchParams: { email?: string }
}) {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect("/settings/accounts")
  }

  if (!searchParams.email) {
    redirect("/login")
  }

  const res = emailSchema.safeParse({ email: searchParams.email })

  if (!res.success) {
    redirect("/login")
  }

  return <OtpLoginForm email={searchParams.email} />
}
