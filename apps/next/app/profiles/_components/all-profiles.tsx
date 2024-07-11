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
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

import { getAllProfiles } from "@/database/profile"

export const AllProfiles: React.FC = () => {
  const { resolvedTheme: theme } = useTheme()
  const profiles = useQuery({
    queryKey: ["all", "profiles"],
    queryFn: () => getAllProfiles().then(throwServerError),
  })

  if (profiles.isError)
    return (
      <>
        <Alert variant="destructive">
          <CircleXIcon className="size-4" />
          <AlertTitle>Something went wrong!</AlertTitle>
          <AlertDescription>{profiles.error.message}</AlertDescription>
        </Alert>
        <div className="flex flex-col">
          <Button asChild variant="link">
            <Link href="/profiles">Go back</Link>
          </Button>
        </div>
      </>
    )

  if (profiles.isLoading)
    return (
      <div className="space-y-6">
        {[1, 2, 3, 4].map((profile) => (
          <Card key={profile}>
            <CardHeader>
              <Skeleton className="mb-2 size-9 shrink-0 rounded-full dark:border-border" />
              <CardTitle className="text-2xl">
                <Skeleton className="h-8 w-1/2" />
              </CardTitle>
              <CardDescription>
                <Skeleton className="h-5 w-1/3" />
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
        <div className="flex flex-col">
          <Button asChild variant="link">
            <Link href="/profiles">Go back</Link>
          </Button>
        </div>
      </div>
    )

  if (!profiles.data || !profiles.data.length)
    return (
      <>
        <Alert>
          <InfoIcon className="size-4" />
          <AlertTitle>No profiles could be found!</AlertTitle>
          <AlertDescription>We could not find any data</AlertDescription>
        </Alert>
        <div className="flex flex-col">
          <Button asChild variant="link">
            <Link href="/profiles">Go back</Link>
          </Button>
        </div>
      </>
    )

  return (
    <div className="space-y-6">
      {profiles.data.map((profile) => {
        const [preferred_hue, complementary_hue] = generateHSL({
          hue: profile.preferred_hue,
          theme,
        })
        return (
          <Card key={profile.id}>
            <CardHeader>
              <div
                style={{
                  background: `linear-gradient(to top right, ${preferred_hue} 25%, ${complementary_hue})`,
                }}
                className="mb-2 size-9 shrink-0 rounded-full dark:border-border"
              />
              <CardTitle className="text-2xl">{profile.username}</CardTitle>
              <CardDescription>{profile.email}</CardDescription>
            </CardHeader>
          </Card>
        )
      })}
      <div className="flex flex-col">
        <Button asChild variant="link">
          <Link href="/profiles">Go back</Link>
        </Button>
      </div>
    </div>
  )
}
