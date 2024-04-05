"use client"

import * as React from "react"
import Link from "next/link"
import {
  ChevronDownIcon,
  CircleIcon,
  CrossCircledIcon,
  InfoCircledIcon,
  TrashIcon,
} from "@radix-ui/react-icons"
import { useMutation, useQuery } from "@tanstack/react-query"

import { getDigest } from "@/lib/digest"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { AvatarPlaceholder } from "@/components/avatar-placeholder"

import { signOut } from "@/modules/user/auth"
import { getProfile } from "@/modules/user/profile"

export const Accounts: React.FC<{ userId: string }> = ({ userId }) => {
  const profile = useQuery({
    queryKey: ["profiles", userId],
    queryFn: () => getProfile({ id: userId }),
  })

  const digest = getDigest(profile.error)

  if (profile.isLoading) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <div className="animate-pulse">
          <CircleIcon className="size-8 animate-spin" />
        </div>
      </div>
    )
  }

  if (profile.isError) {
    return (
      <div className="flex flex-col items-center justify-center">
        <Alert variant="destructive">
          <CrossCircledIcon className="size-4" />
          <AlertTitle>Something went wrong!</AlertTitle>
          <AlertDescription>
            Profile loading was not successful, please try again; ref: {digest}
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  if (!profile.data) {
    return (
      <div className="flex flex-col items-center justify-center">
        <Alert>
          <InfoCircledIcon className="size-4" />
          <AlertTitle>No data found!</AlertTitle>
          <AlertDescription>
            Please contact the administrator for more information.
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <AccountsContainer
      username={profile.data.username}
      email={profile.data.email}
      preferredName={profile.data.preferred_name}
      preferredHue={profile.data.preferred_hue}
    />
  )
}

export const AccountsContainer: React.FC<{
  username: string
  email: string
  preferredName: string | null
  preferredHue: string | null
}> = ({ username, email, preferredName, preferredHue }) => {
  const logout = useMutation({
    mutationFn: signOut,
  })

  const digest = getDigest(logout.error)

  return (
    <AccountsComponent
      username={username}
      email={email}
      preferredName={preferredName}
      preferredHue={preferredHue}
      signOut={() =>
        logout.mutate({
          redirect: {
            url: "/login",
          },
        })
      }
      isPending={logout.isPending}
      isError={logout.isError}
      errorMessage={`Log out was not successful, please try again; ref: ${digest}`}
    />
  )
}

const AccountsComponent: React.FC<{
  username: string
  email: string
  preferredName: string | null
  preferredHue: string | null
  signOut: () => void
  isPending: boolean
  isError: boolean
  errorMessage?: string
}> = ({
  username,
  email,
  preferredName,
  preferredHue,
  signOut,
  isPending,
  isError,
  errorMessage,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Accounts Settings</CardTitle>
        <CardDescription>
          {preferredName ? `Hello, ${preferredName}!` : "Hi there!"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-x-4">
          <AvatarPlaceholder preferredHue={preferredHue} className="size-10" />
          <div>
            <h4 className="font-semibold">{username}</h4>
            <p>{email}</p>
          </div>
          <div className="ml-auto flex items-center space-x-1 rounded-md bg-secondary text-secondary-foreground">
            <Button
              onClick={() => signOut()}
              disabled={isPending}
              variant="secondary"
              className="px-3 shadow-none"
            >
              {isPending && <CircleIcon className="mr-2 size-4 animate-spin" />}
              Sign out
            </Button>
            <Separator orientation="vertical" className="h-[20px]" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" className="px-2 shadow-none">
                  <ChevronDownIcon className="size-4 text-secondary-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                alignOffset={-5}
                className="w-[200px]"
                forceMount
              >
                <DropdownMenuItem>
                  <Link href="/settings/profile">Profile settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/settings/credentials">Credentials settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem disabled={true}>
                  <TrashIcon className="mr-2 size-4" /> Remove account
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        {isError && (
          <Alert variant="destructive">
            <CrossCircledIcon className="size-4" />
            <AlertTitle>Something went wrong!</AlertTitle>
            <AlertDescription>
              {errorMessage ?? "Unknown error"}
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  )
}
