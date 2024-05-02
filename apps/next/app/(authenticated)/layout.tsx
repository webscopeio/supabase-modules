import { ApplicationLayout } from "@/components/application-layout"

import { createClient } from "@/modules/utils/server"
import { isAnonymousUser } from "@/modules/user/helpers"

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <ApplicationLayout
      userId={user?.id}
      isAnonymousUser={!!user && isAnonymousUser(user)}
    >
      {children}
    </ApplicationLayout>
  )
}
