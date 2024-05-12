import { redirect } from "next/navigation"

import { RegisterFormPasswordless } from "@/components/user/login/new/register-form-passwordless"

import { createClient } from "@/modules/utils/server"

export default async function Page() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    user.is_anonymous ? redirect("/guest") : redirect("/settings/accounts")
  }

  return <RegisterFormPasswordless />
}
