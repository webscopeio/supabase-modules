"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { CircleIcon, CrossCircledIcon } from "@radix-ui/react-icons"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { createBookmark } from "@/modules/bookmarks"

export const CreateBookmark: React.FC<{ userId: string }> = ({ userId }) => {
  const queryClient = useQueryClient()
  const create = useMutation({
    mutationFn: createBookmark,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["bookmarks", userId] })
    },
  })

  function handleCreate({ url }: { url: string }): void {
    create.mutate({
      created_by: userId,
      url,
    })
  }

  return (
    <CreateBookmarkComponent
      createBookmark={handleCreate}
      isPending={create.isPending}
      isError={!!create.data?.error}
      errorMessage={create.data?.error.message}
    />
  )
}

const FormSchema = z.object({
  url: z.string().url(),
})

const CreateBookmarkComponent: React.FC<{
  createBookmark: ({ url }: { url: string }) => void
  isPending: boolean
  isError: boolean
  errorMessage?: string
}> = ({ createBookmark, isPending, isError, errorMessage }) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      url: "",
    },
  })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(({ url }) => {
          createBookmark({ url })
          form.reset()
        })}
        className="flex gap-x-2"
      >
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  placeholder="Enter the URL you want to save"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          {isPending && (
            <CircleIcon className="mr-2 inline size-4 animate-spin" />
          )}
          Save
        </Button>
      </form>
      {isError && (
        <Alert variant="destructive">
          <CrossCircledIcon className="size-4" />
          <AlertTitle>Something went wrong!</AlertTitle>
          <AlertDescription>{errorMessage ?? "Unknown error"}</AlertDescription>
        </Alert>
      )}
    </Form>
  )
}
