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
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

import {
  signInAnonymously,
  signInWithEmailPassword,
  signInWithOtp,
} from "@/modules/user/auth"

export const LoginForm: React.FC<{
  error?: { message: string; status: number }
}> = ({ error }) => {
  const signIn = useMutation({
    mutationFn: signInWithEmailPassword,
  })

  const passwordlessSignIn = useMutation({
    mutationFn: signInWithOtp,
  })

  const anonymousSignIn = useMutation({
    mutationFn: signInAnonymously,
  })

  function handleSignIn({
    email,
    password,
  }: {
    email: string
    password?: string
  }): void {
    password
      ? signIn.mutate({
          email,
          password,
          redirect: {
            url: "/settings/accounts",
          },
        })
      : passwordlessSignIn.mutate({
          email,
          options: {
            shouldCreateUser: false,
          },
          redirect: {
            url: `/login/otp?email=${email}`,
          },
        })
  }

  function handleAnonymousSignIn(): void {
    anonymousSignIn.mutate({
      redirect: {
        url: "/guest",
      },
    })
  }

  return (
    <LoginFormComponent
      signIn={handleSignIn}
      anonymousSignIn={handleAnonymousSignIn}
      isPending={
        signIn.isPending ||
        passwordlessSignIn.isPending ||
        anonymousSignIn.isPending
      }
      isError={
        !!signIn.data?.error ||
        !!passwordlessSignIn.data?.error ||
        !!anonymousSignIn.data?.error ||
        !!error
      }
      errorMessage={
        signIn.data?.error.message ||
        passwordlessSignIn.data?.error.message ||
        anonymousSignIn.data?.error.message ||
        error?.message
      }
    />
  )
}

const FormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(5, { message: "Must be 5 or more characters long" }),
})

const FormSchemaWithOTP = z.object({
  email: z.string().email({ message: "Invalid email address" }),
})

const LoginFormComponent: React.FC<{
  signIn: ({ email, password }: { email: string; password?: string }) => void
  anonymousSignIn: () => void
  isPending: boolean
  isError: boolean
  errorMessage?: string
}> = ({ signIn, anonymousSignIn, isPending, isError, errorMessage }) => {
  const [isLoginWithOTP, setIsLoginWithOTP] = React.useState(false)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(isLoginWithOTP ? FormSchemaWithOTP : FormSchema),
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
            onSubmit={form.handleSubmit(({ email, password }) => {
              isLoginWithOTP ? signIn({ email }) : signIn({ email, password })
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
                  <FormMessage />
                </FormItem>
              )}
            />
            {!isLoginWithOTP && (
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="pt-1">
                      <Link
                        className="underline-offset-4 hover:underline"
                        href="/login/reset-password"
                      >
                        Forgot password?
                      </Link>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {isError && (
              <Alert variant="destructive">
                <CrossCircledIcon className="size-4" />
                <AlertTitle>Something went wrong!</AlertTitle>
                <AlertDescription>
                  {errorMessage ?? "Unknown error"}
                </AlertDescription>
              </Alert>
            )}
            <div className="flex items-center space-x-2">
              <Switch
                checked={isLoginWithOTP}
                onCheckedChange={(v) => setIsLoginWithOTP(v)}
                id="OTP-login"
              />
              <Label htmlFor="OTP-login">Log in with One-Time password</Label>
            </div>
            <footer className="flex flex-col gap-3">
              <Button type="submit" disabled={isPending}>
                {isPending && (
                  <CircleIcon className="mr-2 size-4 animate-spin" />
                )}
                {isLoginWithOTP ? "Email me a One-Time password" : "Sign in"}
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={anonymousSignIn}
                disabled={isPending}
              >
                {isPending && (
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
