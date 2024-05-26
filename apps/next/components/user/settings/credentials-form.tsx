"use client"

import * as React from "react"
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
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog"
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

export const CredentialsForm: React.FC<{ userEmail: string }> = ({
  userEmail,
}) => {
  const [emailChangeInfoDialogState, setEmailChangeInfoDialogState] =
    React.useState<{ isOpen: boolean; newEmail: string | null }>({
      isOpen: false,
      newEmail: null,
    })

  const update = useMutation({
    mutationFn: updateUser,
    onSuccess: (_, vars) => {
      if (vars.email && vars.email !== userEmail)
        setEmailChangeInfoDialogState({ isOpen: true, newEmail: vars.email })
    },
  })

  return (
    <>
      <CredentialsFormComponent
        userEmail={userEmail}
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
              url: "/settings/credentials",
            },
          })
        }}
        isPending={update.isPending}
        isError={!!update.data?.error}
        errorMessage={update.data?.error.message}
      />
      <Dialog
        open={emailChangeInfoDialogState.isOpen}
        onOpenChange={(isOpen) =>
          setEmailChangeInfoDialogState((prevState) => ({
            ...prevState,
            isOpen,
          }))
        }
      >
        <DialogContent className="flex max-w-[480px] flex-col gap-4">
          <DialogHeader>Email change needs to be confirmed</DialogHeader>
          <DialogDescription>
            In order to successfully change the email this need to be confirmed
            for <b>both</b> email addresses. The confirmation links have been
            sent to <b>{emailChangeInfoDialogState.newEmail}</b> and{" "}
            <b>{userEmail}</b>. Please check your inboxes and follow the
            instructions to confirm the change.
          </DialogDescription>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

const FormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).optional(),
  password: z.string().optional(),
})

const CredentialsFormComponent: React.FC<{
  userEmail: string
  updateUser: ({
    email,
    password,
  }: {
    email?: string
    password?: string
  }) => void
  isPending: boolean
  isError: boolean
  errorMessage?: string
}> = ({ userEmail, updateUser, isPending, isError, errorMessage }) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: userEmail,
      password: "",
    },
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Credentials Settings</CardTitle>
        <CardDescription>Manage your credentials settings</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(({ email, password }) => {
              const updates: { email?: string; password?: string } = {}

              if (email) updates.email = email
              if (password) updates.password = password

              if (Object.keys(updates).length > 0) {
                updateUser(updates)
                form.reset()
              }
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
              Update Settings
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
