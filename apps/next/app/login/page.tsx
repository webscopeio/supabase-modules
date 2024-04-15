import { redirect } from "next/navigation"
import * as z from "zod"
import { zu } from "zod_utilz"

import { LoginForm } from "@/components/user/login-form"

import { createClient } from "@/modules/utils/server"

const ErrorSchema = zu
  .stringToJSON()
  .pipe(
    z.object({
      message: z.string(),
      status: z.number(),
    })
  )
  .catch({ message: "An error occurred", status: 500 })

export default async function Page({
  searchParams,
}: {
  searchParams: { error?: string }
}) {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect("/settings/accounts")
  }

  const error = searchParams.error
    ? ErrorSchema.parse(searchParams.error)
    : undefined

  return <LoginForm error={error} />
}
