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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { generateUsername } from "@/database/utils/username"
import { signUpWithEmailPassword } from "@/database/auth"

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Must be 6 or more characters long" }),
})

export const SignUp: React.FC = () => {
  const signUp = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      signUpWithEmailPassword({
        email,
        password,
        options: {
          data: {
            username: generateUsername(),
          },
        },
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
        <CardTitle className="text-2xl">Sign up</CardTitle>
        <CardDescription>
          Create an account by filling the form below
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(({ email, password }) => {
              signUp.mutate({
                email,
                password,
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
            {signUp.isError && (
              <Alert variant="destructive">
                <CircleXIcon className="size-4" />
                <AlertTitle>Something went wrong!</AlertTitle>
                <AlertDescription>{signUp.error.message}</AlertDescription>
              </Alert>
            )}
            <footer className="flex flex-col gap-2">
              <Button type="submit" disabled={signUp.isPending}>
                {signUp.isPending && (
                  <LoaderCircleIcon className="mr-2 size-4 animate-spin" />
                )}
                Create account
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
