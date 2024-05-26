"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  CircleIcon,
  CrossCircledIcon,
  InfoCircledIcon,
} from "@radix-ui/react-icons"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { z } from "zod"

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

import { getProfile, updateProfile } from "@/modules/user/profile"

export const ProfileForm: React.FC<{ userId: string }> = ({ userId }) => {
  const profile = useQuery({
    queryKey: ["profiles", userId],
    queryFn: () => getProfile({ id: userId }),
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
    <ProfileFormContainer
      id={profile.data.id}
      username={profile.data.username}
      fullName={profile.data.full_name}
      preferredName={profile.data.preferred_name}
    />
  )
}

export const ProfileFormContainer: React.FC<{
  id: string
  username: string
  fullName: string | null
  preferredName: string | null
}> = ({ id, username, fullName, preferredName }) => {
  const queryClient = useQueryClient()
  const update = useMutation({
    mutationFn: updateProfile,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["profiles", id] })
    },
  })

  return (
    <ProfileFormComponent
      key={JSON.stringify({ username, fullName, preferredName })}
      id={id}
      username={username}
      fullName={fullName}
      preferredName={preferredName}
      updateProfile={({
        id,
        username,
        full_name,
        preferred_name,
      }: {
        id: string
        username: string
        full_name: string
        preferred_name?: string
      }) =>
        update.mutate({
          id,
          username,
          full_name,
          preferred_name,
          redirect: {
            url: "/settings/accounts",
          },
        })
      }
      isPending={update.isPending}
      isError={!!update.data?.error}
      errorMessage={update.data?.error.message}
    />
  )
}

const FormSchema = z.object({
  username: z.string().min(3, { message: "Must be 3 or more characters long" }),
  full_name: z
    .string()
    .min(3, { message: "Must be 3 or more characters long" }),
  preferred_name: z
    .string()
    .min(3, { message: "Must be 3 or more characters long" }),
})

const ProfileFormComponent: React.FC<{
  id: string
  username: string
  fullName: string | null
  preferredName: string | null
  updateProfile: ({
    id,
    username,
    full_name,
    preferred_name,
  }: {
    id: string
    username: string
    full_name: string
    preferred_name?: string
  }) => void
  isPending: boolean
  isError: boolean
  errorMessage?: string
}> = ({
  id,
  username,
  fullName,
  preferredName,
  updateProfile,
  isPending,
  isError,
  errorMessage,
}) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username,
      full_name: fullName ?? "",
      preferred_name: preferredName ?? "",
    },
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Profile Settings</CardTitle>
        <CardDescription>Manage your profile settings</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(
              ({ username, full_name, preferred_name }) => {
                updateProfile({
                  id,
                  username,
                  full_name,
                  preferred_name,
                })
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
                    <Input placeholder="sosa" {...field} />
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
            {isError && (
              <Alert variant="destructive">
                <CrossCircledIcon className="size-4" />
                <AlertTitle>Something went wrong!</AlertTitle>
                <AlertDescription>
                  {errorMessage ?? "Unknown error"}
                </AlertDescription>
              </Alert>
            )}
            <Button type="submit" disabled={isPending}>
              {isPending && (
                <CircleIcon className="mr-2 inline size-4 animate-spin" />
              )}
              Update Settings
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
