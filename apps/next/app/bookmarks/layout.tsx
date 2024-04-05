import { ApplicationLayout } from "@/components/application-layout"

import { createClient } from "@/modules/utils/server"

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
    <ApplicationLayout userId={user?.id}>
      <section className="mx-auto max-w-5xl space-y-6 py-6">
        <header className="space-y-2">
          <h2 className="text-4xl font-semibold tracking-tight lg:text-5xl">
            Bookmarks
          </h2>
          <p>Add and manage your bookmarks</p>
        </header>
        <div className="w-full">{children}</div>
      </section>
    </ApplicationLayout>
  )
}
