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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { signInAnonymously, signInWithEmailPassword } from "@/modules/user/auth"

export const LoginForm: React.FC<{
  error?: { message: string; status: number }
}> = ({ error }) => {
  const signIn = useMutation({
    mutationFn: signInWithEmailPassword,
  })

  const anonymousSignIn = useMutation({
    mutationFn: signInAnonymously,
  })

  function handleSignIn({
    email,
    password,
  }: {
    email: string
    password: string
  }): void {
    signIn.mutate({
      email,
      password,
      redirect: {
        url: "/settings",
      },
    })
  }

  function handleAnonymousSignIn(): void {
    anonymousSignIn.mutate({
      redirect: {
        url: "/settings",
      },
    })
  }

  return (
    <LoginFormComponent
      signIn={handleSignIn}
      anonymousSignIn={handleAnonymousSignIn}
      isPending={signIn.isPending}
      isPendingSecondary={anonymousSignIn.isPending}
      isError={!!signIn.data?.error || !!anonymousSignIn.data?.error || !!error}
      errorMessage={
        signIn.data?.error.message ||
        anonymousSignIn.data?.error.message ||
        error?.message
      }
    />
  )
}

const FormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(5, { message: "Must be 6 or more characters long" }),
})

const LoginFormComponent: React.FC<{
  signIn: ({ email, password }: { email: string; password: string }) => void
  anonymousSignIn: () => void
  isPending: boolean
  isPendingSecondary: boolean
  isError: boolean
  errorMessage?: string
}> = ({
  signIn,
  anonymousSignIn,
  isPending,
  isPendingSecondary,
  isError,
  errorMessage,
}) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  return (
    <Card className="mx-auto my-16 max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">Sign in</CardTitle>
        <CardDescription>Welcome back!</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(({ email, password }) =>
              signIn({ email, password })
            )}
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
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>Password</FormLabel>
                    <Link
                      className="text-sm text-muted-foreground underline-offset-4 hover:underline"
                      href="/login/reset"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormDescription className="pt-2">
                    <Link
                      className="text-sm underline-offset-4 hover:underline"
                      href="/login/otp"
                    >
                      Sign in with One-Time password
                    </Link>
                  </FormDescription>
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
            <footer className="flex flex-col gap-3">
              <Button type="submit" disabled={isPending}>
                {isPending && (
                  <CircleIcon className="mr-2 size-4 animate-spin" />
                )}
                Sign in
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={anonymousSignIn}
                disabled={isPendingSecondary}
              >
                {isPendingSecondary && (
                  <CircleIcon className="mr-2 size-4 animate-spin" />
                )}
                Continue as guest
              </Button>
              <Button asChild variant="link">
                <Link href="/login/new">Create new account</Link>
              </Button>
            </footer>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
