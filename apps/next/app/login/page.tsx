import { redirect } from "next/navigation"

import { SearchParamError } from "@/lib/types/error"
import { LoginForm } from "@/components/user/login-form"

import { createClient } from "@/modules/utils/server"

export default async function Page({
  searchParams,
}: {
  searchParams: { error?: string }
}) {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (searchParams.error) {
    return (
      <LoginForm error={JSON.parse(searchParams.error) as SearchParamError} />
    )
  }

  if (user) {
    redirect("/settings/accounts")
  }

  return <LoginForm />
}
