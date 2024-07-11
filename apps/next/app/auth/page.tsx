import Link from "next/link"
import { ArrowRightIcon, CircleXIcon } from "lucide-react"
import { z } from "zod"

import { parseString } from "@/lib/utils"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { createClient } from "@/database/client/server"

const errorSchema = z.object({
  message: z.string().catch("An error occurred"),
  status: z.number().catch(500),
})

export default async function Page({
  searchParams: { error },
}: {
  searchParams: { error?: string }
}) {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const parsedError = parseString({
    schema: errorSchema,
    string: error,
  })

  return (
    <section className="space-y-6">
      <p className="font-mono text-sm">
        {user
          ? !user.is_anonymous
            ? `Signed in as: ${user.email}`
            : "Signed in as a guest"
          : `Sign up or sign in to get started`}
      </p>
      {parsedError && (
        <Alert variant="destructive">
          <CircleXIcon className="size-4" />
          <AlertTitle>Something went wrong!</AlertTitle>
          <AlertDescription>{parsedError.message}</AlertDescription>
        </Alert>
      )}
      <div className="grid gap-6 sm:grid-cols-2">
        {[
          {
            title: "Sign up",
            description: "Sign up a user with email and password",
            href: "/auth/sign-up",
          },
          {
            title: "Sign in",
            description: "Sign in a user with email and password",
            href: "/auth/sign-in",
          },
          {
            title: "Magic Link Sign up",
            description: "Sign up a user with an email-based magic link",
            href: "/auth/magic-link/sign-up",
          },
          {
            title: "Magic Link Sign in",
            description: "Sign in a user with an email-based magic link",
            href: "/auth/magic-link/sign-in",
          },
          {
            title: "One-time Password Sign up",
            description: "Sign up a user with an email-based one-time password",
            href: "/auth/otp/sign-up",
          },
          {
            title: "One-time Password Sign in",
            description: "Sign in a user with an email-based one-time password",
            href: "/auth/otp/sign-in",
          },
          {
            title: "One-time Password Access",
            description: "Access the application using a One-time password",
            href: "/auth/otp/access",
          },
          {
            title: "Guest",
            description: "Sign up a user as a guest",
            href: "/auth/guest",
          },
          {
            title: "Password Reset",
            description: "Reset password for an existing user",
            href: "/auth/reset",
          },
          {
            title: "Sign out",
            description: "Sign out an authenticated user (requires session)",
            href: "/auth/sign-out",
            protected: true,
          },
          {
            title: "Update Credentials",
            description: "Update an authenticated user (requires session)",
            href: "/auth/update",
            protected: true,
          },
        ].map((demo) => (
          <Card key={demo.href}>
            <CardHeader className="pb-3">
              <CardTitle className="text-2xl">{demo.title}</CardTitle>
              <CardDescription>{demo.description}</CardDescription>
            </CardHeader>
            <CardContent>
              {((!user && !demo.protected) || (user && demo.protected)) && (
                <Link
                  href={demo.href}
                  className="flex w-fit items-center text-sm"
                >
                  Go to Demo <ArrowRightIcon className="ml-1 inline size-4" />
                </Link>
              )}
              {!user && demo.protected && (
                <p className="text-sm text-muted-foreground">Protected demo</p>
              )}
              {user && !demo.protected && (
                <p className="text-sm text-muted-foreground">
                  Requires no session
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
