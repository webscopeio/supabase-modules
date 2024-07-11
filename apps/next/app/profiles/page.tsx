import Link from "next/link"
import { redirect } from "next/navigation"
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

  if (!user) {
    redirect("/")
  }

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
            title: "View auth'd profile",
            description: "View user profile information",
            href: "/profiles/me",
            anonymous_restricted: true,
          },
          {
            title: "Update auth'd profile",
            description: "Update user profile information",
            href: "/profiles/update",
            anonymous_restricted: true,
          },
          {
            title: "View all profiles",
            description: "View user profile information for all users",
            href: "/profiles/all",
          },
        ].map((demo) => (
          <Card key={demo.href}>
            <CardHeader className="pb-3">
              <CardTitle className="text-2xl">{demo.title}</CardTitle>
              <CardDescription>{demo.description}</CardDescription>
            </CardHeader>
            <CardContent>
              {user.is_anonymous && demo.anonymous_restricted ? (
                <p className="text-sm text-muted-foreground">
                  Restricted for Anonymous users
                </p>
              ) : (
                <Link
                  href={demo.href}
                  className="flex w-fit items-center text-sm"
                >
                  Go to Demo <ArrowRightIcon className="ml-1 inline size-4" />
                </Link>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
