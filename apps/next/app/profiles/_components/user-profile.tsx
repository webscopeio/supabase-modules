"use client"

import * as React from "react"
import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import { CircleXIcon, InfoIcon } from "lucide-react"
import { useTheme } from "next-themes"

import { generateHSL, throwServerError } from "@/lib/utils"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table"

import { getProfile } from "@/database/profile"

export const UserProfile: React.FC<{ userId: string }> = ({ userId }) => {
  const { resolvedTheme: theme } = useTheme()
  const profile = useQuery({
    queryKey: ["profiles", userId],
    queryFn: () => getProfile({ id: userId }).then(throwServerError),
  })

  if (profile.isError)
    return (
      <>
        <Alert variant="destructive">
          <CircleXIcon className="size-4" />
          <AlertTitle>Something went wrong!</AlertTitle>
          <AlertDescription>{profile.error.message}</AlertDescription>
        </Alert>
        <div className="flex flex-col">
          <Button asChild variant="link">
            <Link href="/profiles">Go back</Link>
          </Button>
        </div>
      </>
    )

  if (profile.isLoading)
    return (
      <Card>
        <CardHeader>
          <Skeleton className="mb-2 size-9 shrink-0 rounded-full dark:border-border" />
          <CardTitle className="text-2xl">
            <Skeleton className="h-8 w-1/2" />
          </CardTitle>
          <CardDescription>
            <Skeleton className="h-5 w-1/3" />
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Table>
            <TableBody>
              {[1, 2, 3, 4, 5, 6].map((r) => (
                <TableRow key={r}>
                  <TableHead>
                    <Skeleton className="h-3.5 w-full" />
                  </TableHead>
                  <TableCell className="text-right">
                    <Skeleton className="h-3.5 w-full" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex flex-col gap-2">
            <Button asChild variant="link">
              <Link href="/profiles">Go back</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    )

  if (!profile.data)
    return (
      <>
        <Alert>
          <InfoIcon className="size-4" />
          <AlertTitle>Profile does not exist!</AlertTitle>
          <AlertDescription>We could not find any data</AlertDescription>
        </Alert>
        <div className="flex flex-col">
          <Button asChild variant="link">
            <Link href="/profiles">Go back</Link>
          </Button>
        </div>
      </>
    )

  const [preferred_hue, complementary_hue] = generateHSL({
    hue: profile.data.preferred_hue,
    theme,
  })

  return (
    <Card>
      <CardHeader>
        <div
          style={{
            background: `linear-gradient(to top right, ${preferred_hue} 25%, ${complementary_hue})`,
          }}
          className="mb-2 size-9 shrink-0 rounded-full dark:border-border"
        />
        <CardTitle className="text-2xl">{profile.data.username}</CardTitle>
        <CardDescription>{profile.data.email}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Table>
          <TableBody>
            {[
              {
                label: "Username",
                value: profile.data.username,
              },
              {
                label: "Full name",
                value: profile.data.full_name ?? "—",
              },
              {
                label: "Preferred name",
                value: profile.data.preferred_name ?? "—",
              },
              {
                label: "Preferred hue",
                value: (
                  <span
                    style={{
                      background: `${preferred_hue}`,
                    }}
                    className="float-end size-3.5 shrink-0 rounded-full dark:border-border"
                  />
                ),
              },
              {
                label: "Created at",
                value: new Intl.DateTimeFormat("en-US", {
                  dateStyle: "medium",
                  timeStyle: "short",
                }).format(new Date(profile.data.created_at)),
              },
              {
                label: "Updated at",
                value: new Intl.DateTimeFormat("en-US", {
                  dateStyle: "medium",
                  timeStyle: "short",
                }).format(new Date(profile.data.updated_at)),
              },
            ].map((row) => (
              <TableRow key={row.label}>
                <TableHead>{row.label}</TableHead>
                <TableCell className="text-right">{row.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex flex-col gap-2">
          <Button asChild variant="link">
            <Link href="/profiles">Go back</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
