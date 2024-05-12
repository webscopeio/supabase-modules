"use client"

import * as React from "react"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { CircleIcon, CrossCircledIcon } from "@radix-ui/react-icons"
import { useMutation } from "@tanstack/react-query"
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

import { updateUser } from "@/modules/user/auth"

export const ResetPasswordConfirmForm: React.FC = () => {
  const update = useMutation({
    mutationFn: updateUser,
  })

  return (
    <ResetPasswordConfirmFormComponent
      updateUser={({
        email,
        password,
      }: {
        email?: string
        password?: string
      }) => {
        update.mutate({
          email,
          password,
          redirect: {
            url: "/settings/accounts",
          },
        })
      }}
      isPending={update.isPending}
      isError={!!update.data?.error}
      errorMessage={update.data?.error.message}
    />
  )
}

const FormSchema = z.object({
  password: z.string().min(5, { message: "Must be 6 or more characters long" }),
})

const ResetPasswordConfirmFormComponent: React.FC<{
  updateUser: ({ password }: { password: string }) => void
  isPending: boolean
  isError: boolean
  errorMessage?: string
}> = ({ updateUser, isPending, isError, errorMessage }) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: "",
    },
  })

  return (
    <Card className="mx-auto my-16 max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">New Password</CardTitle>
        <CardDescription>Please fill out the form below</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(({ password }) => {
              updateUser({ password })
            })}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
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
            <footer className="flex flex-col gap-2">
              <Button type="submit" disabled={isPending}>
                {isPending && (
                  <CircleIcon className="mr-2 size-4 animate-spin" />
                )}
                Set new password
              </Button>
              <Button asChild variant="link">
                <Link href="/settings/accounts">Back to Settings</Link>
              </Button>
            </footer>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
