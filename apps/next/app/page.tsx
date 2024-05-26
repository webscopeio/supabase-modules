import { redirect } from "next/navigation"

import { createClient } from "@/modules/utils/server"

export default async function Home() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect("/settings")
  }

  redirect("/login")
}
