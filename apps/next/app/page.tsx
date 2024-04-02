import Link from "next/link"
import { redirect } from "next/navigation"

import { Button } from "@/components/ui/button"

import { createClient } from "@/modules/utils/server"

export default async function Home() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect("/settings/accounts")
  }

  return (
    <div className="mx-auto grid min-h-[60vh] max-w-2xl items-center space-y-6 lg:max-w-4xl">
      <div className="space-y-4">
        <header className="space-y-2">
          <h2 className="text-5xl font-bold tracking-tight lg:text-7xl">
            Supabase Modules
          </h2>
          <p className="text-xl text-muted-foreground">
            Build smarter with pre-built modules today
          </p>
        </header>
        <footer className="flex flex-col gap-2 sm:flex-row">
          <Button asChild>
            <Link href="/login">Sign in</Link>
          </Button>
          <Button variant="link">
            <Link href="/login/new">Create an account</Link>
          </Button>
        </footer>
      </div>
    </div>
  )
}
