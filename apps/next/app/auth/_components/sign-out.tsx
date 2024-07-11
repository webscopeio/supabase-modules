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

import { signOut as signOutFn } from "@/database/auth"

export const SignOut: React.FC = () => {
  const signOut = useMutation({
    mutationFn: () =>
      signOutFn({
        redirect: {
          url: "/auth",
        },
      }).then(throwServerError),
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Sign out</CardTitle>
        <CardDescription>See you back soon!</CardDescription>
      </CardHeader>
      <CardContent>
        {signOut.isError && (
          <Alert variant="destructive">
            <CircleXIcon className="size-4" />
            <AlertTitle>Something went wrong!</AlertTitle>
            <AlertDescription>{signOut.error.message}</AlertDescription>
          </Alert>
        )}
        <footer className="flex flex-col gap-2">
          <Button onClick={() => signOut.mutate()} disabled={signOut.isPending}>
            {signOut.isPending && (
              <LoaderCircleIcon className="mr-2 size-4 animate-spin" />
            )}
            Sign out
          </Button>
          <Button asChild variant="link">
            <Link href="/auth">Go back</Link>
          </Button>
        </footer>
      </CardContent>
    </Card>
  )
}
