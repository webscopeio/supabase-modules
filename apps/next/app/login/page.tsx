import { redirect } from "next/navigation"
import * as z from "zod"

import { LoginForm } from "@/components/user/login-form"

import { createClient } from "@/modules/utils/server"

const ErrorSchema = z
  .string()
  .transform((errorStr, ctx): z.infer<ReturnType<typeof JSON.parse>> => {
    try {
      return JSON.parse(errorStr)
    } catch (e) {
      ctx.addIssue({
        message: "Invalid JSON string",
        code: z.ZodIssueCode.custom,
      })
      return z.NEVER
    }
  })
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
