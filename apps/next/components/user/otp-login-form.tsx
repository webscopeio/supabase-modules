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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"

import { verifyOtp } from "@/modules/user/auth"

export const OtpLoginForm: React.FC<{ email: string }> = ({ email }) => {
  const verify = useMutation({
    mutationFn: verifyOtp,
  })

  return (
    <OtpLoginFormComponent
      verifyOtp={({ token }) =>
        verify.mutate({
          email,
          token,
          redirect: {
            url: "/settings/accounts",
          },
        })
      }
      isPending={verify.isPending}
      isError={verify.isError}
      errorMessage={verify.error?.message}
    />
  )
}

const FormSchema = z.object({
  token: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
})

const OtpLoginFormComponent: React.FC<{
  verifyOtp: ({ token }: { token: string }) => void
  isPending: boolean
  isError: boolean
  errorMessage?: string
}> = ({ verifyOtp, isPending, isError, errorMessage }) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      token: "",
    },
  })

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h2 className="text-4xl font-semibold tracking-tight">
          One-Time password login
        </h2>
        <p>Almost there!</p>
      </header>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(({ token }) => {
            verifyOtp({ token })
          })}
          className="space-y-6"
        >
          <FormField
            control={form.control}
            name="token"
            render={({ field }) => (
              <FormItem>
                <FormLabel>One-Time password</FormLabel>
                <FormControl>
                  <InputOTP
                    maxLength={6}
                    render={({ slots }) => (
                      <InputOTPGroup className="w-full space-x-2">
                        {slots.map((slot, index) => (
                          <InputOTPSlot
                            key={index}
                            className="aspect-square size-full rounded-md border sm:size-9"
                            {...slot}
                          />
                        ))}
                      </InputOTPGroup>
                    )}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Please enter the one-time password sent to your email
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
          <footer className="flex flex-col gap-2 sm:flex-row">
            <Button type="submit" disabled={isPending}>
              {isPending && <CircleIcon className="mr-2 size-4 animate-spin" />}
              Sign in
            </Button>
            <Button asChild variant="link">
              <Link href="/login/new">Create new account</Link>
            </Button>
          </footer>
        </form>
      </Form>
    </div>
  )
}
