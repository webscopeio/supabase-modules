/* eslint-disable @next/next/no-img-element */
"use client"

import Link from "next/link"
import { CrossCircledIcon, InfoCircledIcon } from "@radix-ui/react-icons"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { CircleIcon, Loader2 } from "lucide-react"
import { toast } from "sonner"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { deleteBookmark, getBookmarks } from "@/modules/bookmarks"

export const BookmarksList: React.FC<{ userId: string }> = ({ userId }) => {
  const bookmarks = useQuery({
    queryKey: ["bookmarks", userId],
    queryFn: () => getBookmarks({ id: userId }),
  })

  if (bookmarks.isLoading) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <div className="animate-pulse">
          <CircleIcon className="inline size-8 animate-spin" />
        </div>
      </div>
    )
  }

  if (bookmarks.data && "error" in bookmarks.data) {
    return (
      <div className="flex flex-col items-center justify-center">
        <Alert variant="destructive">
          <CrossCircledIcon className="size-4" />
          <AlertTitle>Something went wrong!</AlertTitle>
          <AlertDescription>{bookmarks.data.error.message}</AlertDescription>
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
      {bookmarks.data.map(
        ({ id, title, description, url, image_url, tags }) => (
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
            <CardContent className="space-y-4">
              <Link
                className="block text-muted-foreground underline underline-offset-4"
                href={url}
              >
                {url}
              </Link>
            </CardContent>
            <CardFooter className="mt-auto flex flex-col items-start gap-y-2">
              {tags && (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge key={tag}>#{tag}</Badge>
                  ))}
                </div>
              )}
              <div>
                <BookmarkDelete bookmarkId={id} userId={userId} />
              </div>
            </CardFooter>
          </Card>
        )
      )}
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
    onSuccess: async (data) => {
      if (data && "error" in data) {
        return toast.error(data.error.message)
      }
      await queryClient.invalidateQueries({ queryKey: ["bookmarks", userId] })
    },
  })

  return (
    <Button
      onClick={() => mutate(bookmarkId)}
      variant={"ghost"}
      size={"sm"}
      className="-ml-3 block"
    >
      {isPending && <Loader2 className="mr-1.5 inline size-4 animate-spin" />}
      Delete
    </Button>
  )
}
