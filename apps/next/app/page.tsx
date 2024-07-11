import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { createClient } from "@/database/client/server"

export default async function Page() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <section className="space-y-6">
      <p className="font-mono text-sm">
        {user
          ? !user.is_anonymous
            ? `Signed in as: ${user.email}`
            : "Signed in as a guest"
          : `Sign up or sign in to get started`}
      </p>
      <div className="grid gap-6 sm:grid-cols-2">
        {[
          {
            title: "Auth Module",
            description: "Create, manage and update user information",
            href: "/auth",
          },
          {
            title: "Profile Module",
            description: "Manage and update profile information",
            href: "/profiles",
            protected: true,
          },
        ].map((module) => (
          <Card key={module.href}>
            <CardHeader className="pb-3">
              <CardTitle className="text-2xl">{module.title}</CardTitle>
              <CardDescription>{module.description}</CardDescription>
            </CardHeader>
            <CardContent>
              {((!user && !module.protected) || user) && (
                <Link
                  href={module.href}
                  className="flex w-fit items-center text-sm"
                >
                  Go to Module <ArrowRightIcon className="ml-1 inline size-4" />
                </Link>
              )}
              {!user && module.protected && (
                <p className="text-sm text-muted-foreground">
                  Protected Module
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
