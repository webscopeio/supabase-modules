"use client"

import * as React from "react"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { CircleIcon, CrossCircledIcon } from "@radix-ui/react-icons"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { resetPasswordForEmail } from "@/modules/user/auth"

export const ResetPasswordForm: React.FC = () => {
  const reset = useMutation({
    mutationFn: resetPasswordForEmail,
  })

  return (
    <ResetPasswordFormComponent
      resetPassword={(email: string) => reset.mutate({ email })}
      isPending={reset.isPending}
      isError={reset.isError}
      errorMessage={reset.error?.message}
    />
  )
}

const FormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
})

const ResetPasswordFormComponent: React.FC<{
  resetPassword: (email: string) => void
  isPending: boolean
  isError: boolean
  errorMessage?: string
}> = ({ resetPassword, isPending, isError, errorMessage }) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  })

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h2 className="text-4xl font-semibold tracking-tight">
          Reset Password
        </h2>
        <p>Please fill out the form below</p>
      </header>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(({ email }) => {
            resetPassword(email)
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
          <footer className="flex flex-col gap-2 sm:flex-row">
            <Button type="submit" disabled={isPending}>
              {isPending && <CircleIcon className="mr-2 size-4 animate-spin" />}
              Reset password
            </Button>
            <Button asChild variant="link">
              <Link href="/login">Back to Login</Link>
            </Button>
          </footer>
        </form>
      </Form>
    </div>
  )
}
