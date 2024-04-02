"use client"

import * as React from "react"
import Link from "next/link"
import { useMutation, useQuery } from "@tanstack/react-query"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { signOut } from "@/modules/user/auth"
import { getProfile } from "@/modules/user/profile"

export const ProfileDropDown: React.FC<{ userId?: string }> = ({ userId }) => {
  if (!userId) {
    return (
      <Button asChild className="ml-auto">
        <Link href="/login">Login</Link>
      </Button>
    )
  }
  return <ProfileDropDownComponent userId={userId} />
}

const ProfileDropDownComponent: React.FC<{ userId: string }> = ({ userId }) => {
  const profile = useQuery({
    queryKey: ["profiles", userId],
    queryFn: () => getProfile({ id: userId }),
  })

  const logout = useMutation({
    mutationFn: signOut,
  })

  if (profile.isLoading) {
    return (
      <div className="relative ml-auto flex size-10 shrink-0 animate-pulse overflow-hidden rounded-full bg-muted" />
    )
  }

  if (profile.error || !profile.data) {
    return <></>
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="ml-auto overflow-hidden rounded-full"
        >
          <Avatar>
            <AvatarImage src="https://ui.shadcn.com/avatars/04.png" />
            <AvatarFallback>
              {profile.data.username.toUpperCase().substring(0, 2)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-48" align="end">
        <DropdownMenuLabel>{profile.data.username}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/settings/accounts">Accounts</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/settings/profile">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/settings/credentials">Credentials</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() =>
            logout.mutate({
              redirect: {
                url: "/login",
              },
            })
          }
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
