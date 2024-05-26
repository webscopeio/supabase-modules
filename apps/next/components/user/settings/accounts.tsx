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

  const logout = useMutation({
    mutationFn: signOut,
  })

  if (profile.isLoading) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <div className="animate-pulse">
          <CircleIcon className="size-8 animate-spin" />
        </div>
      </div>
    )
  }

  if (profile.data && "error" in profile.data) {
    return (
      <div className="flex flex-col items-center justify-center">
        <Alert variant="destructive">
          <CrossCircledIcon className="size-4" />
          <AlertTitle>Something went wrong!</AlertTitle>
          <AlertDescription>{profile.data.error.message}</AlertDescription>
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
    <AccountsComponent
      username={profile.data.username}
      email={profile.data.email}
      preferredName={profile.data.preferred_name}
      preferredHue={profile.data.preferred_hue}
      signOut={() =>
        logout.mutate({
          redirect: {
            url: "/login",
          },
        })
      }
      isPending={logout.isPending}
      isError={!!logout.data?.error}
      errorMessage={logout.data?.error.message}
    />
  )
}

const AccountsComponent: React.FC<{
  username: string
  email: string
  preferredName: string | null
  preferredHue: string
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
        <div className="flex items-end gap-x-4">
          <div className="flex flex-col items-start justify-center gap-x-4 gap-y-2 sm:flex-row">
            <AvatarPlaceholder
              preferredHue={preferredHue}
              className="size-10"
            />
            <div>
              <h4 className="font-semibold">{username}</h4>
              <p>{email}</p>
            </div>
          </div>
          <div className="ml-auto flex items-center rounded-md bg-secondary text-secondary-foreground sm:space-x-1">
            <Button
              onClick={() => signOut()}
              disabled={isPending}
              variant="secondary"
              className="hidden px-3 shadow-none sm:block"
            >
              {isPending && (
                <CircleIcon className="mr-2 inline size-4 animate-spin" />
              )}
              Sign out
            </Button>
            <Separator
              orientation="vertical"
              className="hidden h-[20px] sm:block"
            />
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
