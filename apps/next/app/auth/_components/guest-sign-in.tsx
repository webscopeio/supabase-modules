"use client"

import * as React from "react"
import Link from "next/link"
import { useMutation } from "@tanstack/react-query"
import { CircleXIcon, LoaderCircleIcon } from "lucide-react"

import { throwServerError } from "@/lib/utils"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { generateUsername } from "@/database/utils/username"
import { signInAnonymously } from "@/database/auth"

export const GuestSignIn: React.FC = () => {
  const guestSignIn = useMutation({
    mutationFn: () =>
      signInAnonymously({
        options: {
          data: {
            username: generateUsername({ isAnonymous: true }),
          },
        },
        redirect: {
          url: "/auth",
        },
      }).then(throwServerError),
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Guest Sign in</CardTitle>
        <CardDescription>
          Get started without creating an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        {guestSignIn.isError && (
          <Alert variant="destructive">
            <CircleXIcon className="size-4" />
            <AlertTitle>Something went wrong!</AlertTitle>
            <AlertDescription>{guestSignIn.error.message}</AlertDescription>
          </Alert>
        )}
        <footer className="flex flex-col gap-2">
          <Button
            onClick={() => guestSignIn.mutate()}
            disabled={guestSignIn.isPending}
          >
            {guestSignIn.isPending && (
              <LoaderCircleIcon className="mr-2 size-4 animate-spin" />
            )}
            Sign in
          </Button>
          <Button asChild variant="link">
            <Link href="/auth">Go back</Link>
          </Button>
        </footer>
      </CardContent>
    </Card>
  )
}
