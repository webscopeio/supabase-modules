"use client"

import * as React from "react"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { CircleXIcon, LoaderCircleIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { updateUser as updateUserFn } from "@/database/auth"

const formSchema = z.object({
  email: z
    .string()
    .refine(
      (v) =>
        v === "" ||
        (v && v.length > 1 && z.string().email().safeParse(v).success),
      {
        message: "Invid email address",
      }
    ),
  password: z
    .string()
    .refine(
      (v) =>
        v === "" ||
        (v && v.length > 1 && z.string().min(6).safeParse(v).success),
      {
        message: "Must be 6 or more characters long",
      }
    ),
})

export const Update: React.FC = () => {
  const updateUser = useMutation({
    mutationFn: ({ email, password }: { email?: string; password?: string }) =>
      updateUserFn({
        email,
        password,
        redirect: {
          url: "/auth",
        },
      }).then(throwServerError),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Update Credentials</CardTitle>
        <CardDescription>Update an authenticated user</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(({ email, password }) => {
              if (!email && !password) {
                return form.setError("root", {
                  message: "Must update either email or password",
                })
              }

              const updates: { email?: string; password?: string } = {}
              if (email) updates.email = email
              if (password) updates.password = password
              updateUser.mutate(updates)
            })}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="sosa@webscope.io" {...field} />
                  </FormControl>
                  <FormDescription>
                    (Optional) the new email you would like to use
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormDescription>
                    (Optional) the new password you would like to use
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {updateUser.error && (
              <Alert variant="destructive">
                <CircleXIcon className="size-4" />
                <AlertTitle>Something went wrong!</AlertTitle>
                <AlertDescription>{updateUser.error.message}</AlertDescription>
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
              <Button type="submit" disabled={updateUser.isPending}>
                {updateUser.isPending && (
                  <LoaderCircleIcon className="mr-2 size-4 animate-spin" />
                )}
                Update settings
              </Button>
              <Button asChild variant="link">
                <Link href="/auth">Go back</Link>
              </Button>
            </footer>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
