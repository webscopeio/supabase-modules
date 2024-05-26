import { ApplicationLayout } from "@/components/application-layout"

import { createClient } from "@/modules/utils/server"

export default async function Navigation({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return <>{children}</>
  }

  return (
    <ApplicationLayout userId={user.id} isAnonymousUser={user.is_anonymous}>
      {children}
    </ApplicationLayout>
  )
}
