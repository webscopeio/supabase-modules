import { DynamicBreadCrumbs } from "@/components/dynamic-breadcrumbs"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="mx-auto max-w-lg space-y-2 py-12">
      <DynamicBreadCrumbs />
      {children}
    </section>
  )
}
