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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"

import { verifyOtp } from "@/modules/user/auth"

export const OtpLoginConfirmForm: React.FC<{ email: string }> = ({ email }) => {
  const verify = useMutation({
    mutationFn: verifyOtp,
  })

  return (
    <OtpLoginConfirmFormComponent
      email={email}
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
      isError={!!verify.data?.error}
      errorMessage={verify.data?.error.message}
    />
  )
}

const FormSchema = z.object({
  token: z.string().min(6, {
    message: "Your One-Time password must be 6 characters.",
  }),
})

const OtpLoginConfirmFormComponent: React.FC<{
  email: string
  verifyOtp: ({ token }: { token: string }) => void
  isPending: boolean
  isError: boolean
  errorMessage?: string
}> = ({ email, verifyOtp, isPending, isError, errorMessage }) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      token: "",
    },
  })

  return (
    <Card className="mx-auto my-16 max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">One-Time password login</CardTitle>
        <CardDescription>Almost there!</CardDescription>
      </CardHeader>
      <CardContent>
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
                    Please enter the One-Time password sent to: <b>{email}</b>
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
            <footer className="flex flex-col gap-2">
              <Button type="submit" disabled={isPending}>
                {isPending && (
                  <CircleIcon className="mr-2 size-4 animate-spin" />
                )}
                Sign in
              </Button>
              <Button asChild variant="link">
                <Link href="/login/otp">Back to OTP Login</Link>
              </Button>
            </footer>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
