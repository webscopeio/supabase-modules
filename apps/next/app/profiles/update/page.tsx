import { redirect } from "next/navigation"

import { createClient } from "@/database/client/server"

import { UpdateProfile } from "../_components/update-profile"

export default async function Page() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user || user.is_anonymous) {
    redirect("/")
  }
  return <UpdateProfile userId={user.id} />
}
