"use client"

import * as React from "react"
import Link from "next/link"
import { useMutation, useQuery } from "@tanstack/react-query"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AvatarPlaceholder } from "@/components/avatar-placeholder"

import { signOut } from "@/modules/user/auth"
import { getProfile } from "@/modules/user/profile"

const DEFAULT_HUE = 100

export const ProfileDropdown: React.FC<{
  userId: string
  isAnonymousUser?: boolean
}> = ({ userId, isAnonymousUser }) => {
  const [signOutWarningOpen, setSignOutWarningOpen] = React.useState(false)

  const profile = useQuery({
    enabled: !isAnonymousUser,
    queryKey: ["profiles", userId],
    queryFn: () => getProfile({ id: userId }),
  })

  const logout = useMutation({
    mutationFn: signOut,
  })

  function handleSignOut() {
    if (isAnonymousUser) {
      setSignOutWarningOpen(true)
    } else {
      logout.mutate({
        redirect: {
          url: "/login",
        },
      })
    }
  }

  if (profile.data && "error" in profile.data) {
    return (
      <div className="relative ml-auto flex size-9 overflow-hidden rounded-full bg-destructive" />
    )
  }

  if (profile.isLoading) {
    return (
      <div className="relative ml-auto flex size-9 animate-pulse overflow-hidden rounded-full bg-muted" />
    )
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="ml-auto overflow-hidden rounded-full"
          >
            <AvatarPlaceholder
              preferredHue={
                profile?.data?.preferred_hue ?? DEFAULT_HUE.toString()
              }
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-48" align="end">
          <DropdownMenuLabel>
            {profile?.data?.username ?? "Guest"}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem disabled={isAnonymousUser} asChild>
            <Link href="/settings/accounts">Accounts</Link>
          </DropdownMenuItem>
          <DropdownMenuItem disabled={isAnonymousUser} asChild>
            <Link href="/settings/profile">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem disabled={isAnonymousUser} asChild>
            <Link href="/settings/credentials">Credentials</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleSignOut()}>
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={signOutWarningOpen} onOpenChange={setSignOutWarningOpen}>
        <DialogContent className="flex max-w-[480px] flex-col gap-4">
          <DialogHeader>You are logged in as guest</DialogHeader>
          <DialogDescription>
            You are about to sign out from the account. You must finish
            resigtration otherwise you will lose access to this account.
          </DialogDescription>
          <DialogFooter>
            <DialogClose asChild>
              <Button asChild>
                <Link href="/settings">Finish registration</Link>
              </Button>
            </DialogClose>
            <Button
              variant="destructive"
              onClick={() =>
                logout.mutate({
                  redirect: {
                    url: "/login",
                  },
                })
              }
            >
              Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
