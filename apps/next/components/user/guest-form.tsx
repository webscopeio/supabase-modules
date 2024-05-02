"use client"

import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { CircleIcon, CrossCircledIcon } from "@radix-ui/react-icons"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { getDigest } from "@/lib/digest"
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

import { updateUser } from "@/modules/user/auth"

export const GuestForm: React.FC<{
  isAnonymousUser: boolean
}> = ({ isAnonymousUser }) => {
  const finishSignUp = useMutation({
    mutationFn: updateUser,
  })

  const digest = getDigest(finishSignUp.error)

  if (finishSignUp.isSuccess) {
    return <GuestFormEmailSent email={finishSignUp.variables.email ?? ""} />
  }

  if (isAnonymousUser)
    return (
      <GuestFormNotRegistered
        finishSignUp={({ email }) =>
          finishSignUp.mutate({ email, data: { hasPassword: false } })
        }
        isPending={finishSignUp.isPending}
        isError={finishSignUp.isError}
        errorMessage={`Credentials update was not successful, please try again; ref: ${digest}`}
      />
    )

  return (
    <GuestFormNoPassword
      finishSignUp={({ password }) =>
        finishSignUp.mutate({ password, data: { hasPassword: true } })
      }
      isPending={finishSignUp.isPending}
      isError={finishSignUp.isError}
      errorMessage={`Credentials update was not successful, please try again; ref: ${digest}`}
    />
  )
}

const GuestFormEmailSent: React.FC<{ email: string }> = ({ email }) => (
  <Card>
    <CardContent className="flex min-h-[200px] items-center justify-center p-6">
      <CardDescription>
        Confrimation email was sent to <b>{email}</b>. Please check your inbox
        and follow the instructions.
      </CardDescription>
    </CardContent>
  </Card>
)

const NotRegisteredFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
})

const GuestFormNotRegistered: React.FC<{
  finishSignUp: ({ email }: { email: string }) => void
  isPending: boolean
  isError: boolean
  errorMessage?: string
}> = ({ finishSignUp, isPending, isError, errorMessage }) => {
  const form = useForm<z.infer<typeof NotRegisteredFormSchema>>({
    resolver: zodResolver(NotRegisteredFormSchema),
    defaultValues: {
      email: "",
    },
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Finish registration</CardTitle>
        <CardDescription>
          Finish sign up process to be able to log in again. Start by entering
          your email.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(({ email }) => {
              finishSignUp({
                email,
              })
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
              {isPending && <CircleIcon className="mr-2 size-4 animate-spin" />}
              Create account
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

const NoPasswordFormSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),
})

const GuestFormNoPassword: React.FC<{
  finishSignUp: ({ password }: { password: string }) => void
  isPending: boolean
  isError: boolean
  errorMessage?: string
}> = ({ finishSignUp, isError, isPending, errorMessage }) => {
  const form = useForm<z.infer<typeof NoPasswordFormSchema>>({
    resolver: zodResolver(NoPasswordFormSchema),
    defaultValues: {
      password: "",
    },
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Set up a password</CardTitle>
        <CardDescription>
          You need to create a password to finish sign up process.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(({ password }) => {
              finishSignUp({
                password,
              })
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
                  <FormDescription>
                    The new password you would like to use
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
            <Button type="submit" disabled={isPending}>
              {isPending && <CircleIcon className="mr-2 size-4 animate-spin" />}
              Set password
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}