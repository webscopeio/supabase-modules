import { redirect } from "next/navigation"
import { z } from "zod"

import { LoginForm } from "@/components/user/login/login-form"

import { createClient } from "@/modules/utils/server"

export default async function Page({
  searchParams: { error },
}: {
  searchParams: { error?: string }
}) {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect("/settings")
  }

  if (error) {
    return <LoginForm error={parseError(error)} />
  }

  return <LoginForm />
}

const errorSchema = z.object({
  message: z.string().catch("An error occurred"),
  status: z.number().catch(500),
})

function parseError(error: string) {
  try {
    return errorSchema.parse(JSON.parse(error))
  } catch (_error) {
    return errorSchema.parse({})
  }
}
