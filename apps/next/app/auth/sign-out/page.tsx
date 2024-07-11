import { redirect } from "next/navigation"

import { createClient } from "@/database/client/server"

import { SignOut } from "../_components/sign-out"

export default async function Page() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth")
  }

  return <SignOut />
}
