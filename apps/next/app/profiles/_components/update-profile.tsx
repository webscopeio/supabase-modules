"use client"

import * as React from "react"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { CircleXIcon, InfoIcon, LoaderCircleIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { useForm } from "react-hook-form"
import { z } from "zod"

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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"

import { PartialExcept, Profile } from "@/database/types"
import {
  getProfile,
  updateProfile as updateProfileFn,
} from "@/database/profile"

export const UpdateProfile: React.FC<{ userId: string }> = ({ userId }) => {
  const profile = useQuery({
    queryKey: ["profile", userId],
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
          {[1, 2, 3].map((field) => (
            <div key={field} className="space-y-2">
              <Skeleton className="block h-6 w-1/4" />
              <Skeleton className="block h-9 w-full" />
            </div>
          ))}
          <div className="flex flex-col gap-2">
            <Skeleton className="block h-9 w-full" />
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

  return <UpdateProfileForm profile={profile.data} />
}

function validateString(v: string) {
  return (
    v === "" || (v && v.length > 1 && z.string().min(3).safeParse(v).success)
  )
}

const formSchema = z.object({
  username: z.string().refine(validateString, {
    message: "Must be 3 or more characters long",
  }),
  full_name: z.string().refine(validateString, {
    message: "Must be 3 or more characters long",
  }),
  preferred_name: z.string().refine(validateString, {
    message: "Must be 3 or more characters long",
  }),
})

const UpdateProfileForm: React.FC<{ profile: Profile }> = ({ profile }) => {
  const { resolvedTheme: theme } = useTheme()
  const queryClient = useQueryClient()
  const updateProfile = useMutation({
    mutationFn: (updates: PartialExcept<Profile, "id">) =>
      updateProfileFn({
        ...updates,
        redirect: {
          url: "/profiles/me",
        },
      }).then(throwServerError),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["profile", profile.id] })
    },
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: profile.username ?? "",
      full_name: profile.full_name ?? "",
      preferred_name: profile.preferred_name ?? "",
    },
  })

  const [preferred_hue, complementary_hue] = generateHSL({
    hue: profile.preferred_hue,
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
        <CardTitle className="text-2xl">{profile.username}</CardTitle>
        <CardDescription>{profile.email}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(
              ({ username, full_name, preferred_name }) => {
                if (!username && !full_name && !preferred_name) {
                  return form.setError("root", {
                    message: "Must update at least one or more fields",
                  })
                }

                const updates: {
                  id: string
                  username?: string
                  full_name?: string
                  preferred_name?: string
                } = { id: profile.id }
                if (username) updates.username = username
                if (full_name) updates.full_name = full_name
                if (preferred_name) updates.preferred_name = preferred_name
                updateProfile.mutate(updates)
              }
            )}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="iamhectorsosa" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full name</FormLabel>
                  <FormControl>
                    <Input placeholder="Hector Sosa" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="preferred_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred name</FormLabel>
                  <FormControl>
                    <Input placeholder="Hector" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {updateProfile.error && (
              <Alert variant="destructive">
                <CircleXIcon className="size-4" />
                <AlertTitle>Something went wrong!</AlertTitle>
                <AlertDescription>
                  {updateProfile.error.message}
                </AlertDescription>
              </Alert>
            )}
            {form.formState.errors.root && (
              <Alert variant="destructive">
                <CircleXIcon className="size-4" />
                <AlertTitle>Something went wrong!</AlertTitle>
                <AlertDescription>
                  {form.formState.errors.root.message}
                </AlertDescription>
              </Alert>
            )}
            <footer className="flex flex-col gap-2">
              <Button type="submit" disabled={updateProfile.isPending}>
                {updateProfile.isPending && (
                  <LoaderCircleIcon className="mr-2 size-4 animate-spin" />
                )}
                Update profile
              </Button>
              <Button asChild variant="link">
                <Link href="/profiles">Go back</Link>
              </Button>
            </footer>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
