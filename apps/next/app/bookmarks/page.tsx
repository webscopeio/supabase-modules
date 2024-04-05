import { redirect } from "next/navigation"

import { BookmarksList } from "@/components/bookmarks/bookmarks-list"
import { CreateBookmark } from "@/components/bookmarks/create-bookmark"

import { createClient } from "@/modules/utils/server"

export default async function Page() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <div className="space-y-8">
      <CreateBookmark userId={user.id} />
      <BookmarksList userId={user.id} />
    </div>
  )
}
