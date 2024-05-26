"use client"

import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { CircleIcon, CrossCircledIcon } from "@radix-ui/react-icons"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
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

import { updateUser } from "@/modules/user/auth"

export const GuestForm: React.FC = () => {
  const finishSignUp = useMutation({
    mutationFn: updateUser,
    onSuccess: (data, vars) => {
      if (!(data && "error" in data)) {
        toast.success(`Confrimation email was sent to ${vars.email}. Please check your inbox
        and follow the instructions.`)
      }
    },
  })

  return (
    <GuestFormNotRegistered
      finishSignUp={({ email }) => finishSignUp.mutate({ email })}
      isPending={finishSignUp.isPending}
      isError={!!finishSignUp.data?.error}
      errorMessage={finishSignUp.data?.error.message}
    />
  )
}

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
                  <FormDescription>
                    Once you&apos;ve confirmed your email, you&apos;ll need to
                    set a password as well via <b>Setttings — Credentials</b>.
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
              {isPending && (
                <CircleIcon className="mr-2 inline size-4 animate-spin" />
              )}
              Create account
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
