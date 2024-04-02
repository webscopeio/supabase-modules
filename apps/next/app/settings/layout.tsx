import { DynamicNavigationLinks } from "@/components/dynamic-navigation-links"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="mx-auto max-w-5xl space-y-6 py-6">
      <header className="space-y-2">
        <h2 className="text-5xl font-semibold tracking-tight">Settings</h2>
        <p>Manage your accounts, profile and credentials settings</p>
      </header>
      <div className="flex flex-col gap-6 lg:flex-row">
        <nav className="-ml-4 h-full min-w-[30%]">
          <DynamicNavigationLinks
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
