import { redirect } from "next/navigation"
import { z } from "zod"

import { OtpLoginConfirmForm } from "@/components/user/login/otp/otp-login-confirm-form"

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
    redirect("/settings")
  }

  if (!searchParams.email) {
    redirect("/login")
  }

  const res = emailSchema.safeParse({ email: searchParams.email })

  if (!res.success) {
    redirect("/login")
  }

  return <OtpLoginConfirmForm email={searchParams.email} />
}
