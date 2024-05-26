import { DynamicNavigationLinks } from "@/components/dynamic-navigation-links"

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

  if (!user) return null

  return (
    <section className="mx-auto max-w-5xl space-y-6 py-6">
      <header className="space-y-2">
        <h2 className="text-4xl font-semibold tracking-tight lg:text-5xl">
          {!user.is_anonymous ? "Settings" : "Guest Settings"}
        </h2>
        <p>
          {!user.is_anonymous
            ? "Manage your accounts, profile and credentials settings"
            : "Access to settings is restricted to anonymous users"}
        </p>
      </header>
      <div className="flex flex-col gap-6 lg:flex-row">
        <nav className="-ml-4 h-full min-w-[30%]">
          <DynamicNavigationLinks
            isAnonymousUser={user.is_anonymous}
            items={[
              {
                href: "/settings/accounts",
                label: "Accounts",
              },
              {
                href: "/settings/profile",
                label: "Profile",
              },
              {
                href: "/settings/credentials",
                label: "Credentials",
              },
            ]}
          />
        </nav>
        <div className="w-full">{children}</div>
      </div>
    </section>
  )
}
