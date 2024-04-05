/* eslint-disable @next/next/no-img-element */
"use client"

import Link from "next/link"
import { CrossCircledIcon, InfoCircledIcon } from "@radix-ui/react-icons"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { CircleIcon, Loader2 } from "lucide-react"
import { toast } from "sonner"

import { getDigest } from "@/lib/digest"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { deleteBookmark, getBookmarks } from "@/modules/bookmarks"

import { Button } from "../ui/button"

export const BookmarksList: React.FC<{ userId: string }> = ({ userId }) => {
  const bookmarks = useQuery({
    queryKey: ["bookmarks", userId],
    queryFn: () => getBookmarks({ id: userId }),
  })

  const digest = getDigest(bookmarks.error)

  if (bookmarks.isLoading) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <div className="animate-pulse">
          <CircleIcon className="size-8 animate-spin" />
        </div>
      </div>
    )
  }

  if (bookmarks.isError) {
    return (
      <div className="flex flex-col items-center justify-center">
        <Alert variant="destructive">
          <CrossCircledIcon className="size-4" />
          <AlertTitle>Something went wrong!</AlertTitle>
          <AlertDescription>
            Bookmarks loading was not successful, please try again; ref:{" "}
            {digest}
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  if (!bookmarks.data) {
    return (
      <div className="flex flex-col items-center justify-center">
        <Alert>
          <InfoCircledIcon className="size-4" />
          <AlertTitle>No data found!</AlertTitle>
          <AlertDescription>
            Please contact the administrator for more information.
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {bookmarks.data.map(({ id, title, description, url, image_url }) => (
        <Card className="flex flex-col overflow-hidden" key={id}>
          {image_url && (
            <img
              loading="lazy"
              alt={title}
              src={image_url}
              className="h-24 w-full object-cover"
            />
          )}
          <CardHeader className="py-4">
            <CardTitle className="line-clamp-1 text-xl">{title}</CardTitle>
            <CardDescription className="line-clamp-2">
              {description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link
              className="block text-muted-foreground underline underline-offset-4"
              href={url}
            >
              {url}
            </Link>
          </CardContent>
          <CardFooter className="mt-auto">
            <BookmarkDelete bookmarkId={id} userId={userId} />
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

const BookmarkDelete: React.FC<{ bookmarkId: string; userId: string }> = ({
  bookmarkId,
  userId,
}) => {
  const queryClient = useQueryClient()
  const { isPending, mutate } = useMutation({
    mutationFn: deleteBookmark,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["bookmarks", userId] })
    },
    onError: (error) => {
      const digest = getDigest(error)
      toast.error(`Bookmark deletion was not successful, please try again; ref:
      ${digest}`)
    },
  })

  return (
    <Button
      onClick={() => mutate(bookmarkId)}
      variant={"ghost"}
      size={"sm"}
      className="-ml-3"
    >
      {isPending && <Loader2 className="mr-1.5 size-4 animate-spin" />}
      Delete
    </Button>
  )
}
