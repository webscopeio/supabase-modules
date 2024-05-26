import { redirect } from "next/navigation"

import { RegisterForm } from "@/components/user/login/new/register-form"

import { createClient } from "@/modules/utils/server"

export default async function Page() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect("/settings/accounts")
  }

  return <RegisterForm />
}
