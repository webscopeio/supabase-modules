"use server"

import { z } from "zod"

import { Database } from "@/modules/types"
import { createClient } from "@/modules/utils/server"

type Bookmark = Database["public"]["Tables"]["bookmarks"]["Row"]

type ServerError = {
  error: { message: string }
}

const bookmarkSchema = z.object({
  title: z.string(),
  description: z.string(),
  image: z.string().url().optional(),
})

// #region getBookmarks
export async function getBookmarks({
  id,
}: {
  id: string
}): Promise<Bookmark[] | null | ServerError | void> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("bookmarks")
    .select("*")
    .eq("created_by", id)
    .order("created_at", { ascending: false })
  if (error) return { error: { message: error.message } }
  return data
}
// #endregion getBookmarks

// #region createBookmark
export async function createBookmark({
  created_by,
  url,
}: {
  created_by: string
  url: string
}): Promise<ServerError | void> {
  const response = await fetch(`https://api.dub.co/metatags?url=${url}`)
  if (!response.ok) throw new Error(`Error: ${response.status}`)
  const unparsedData = (await response.json()) as unknown
  const { title, description, image } = bookmarkSchema.parse(unparsedData)

  const supabase = createClient()
  const { error } = await supabase.from("bookmarks").insert({
    created_by,
    url,
    title,
    description,
    image_url: image ?? null,
  })
  if (error) return { error: { message: error.message } }
}
// #endregion createBookmark

// #region deleteBookmark
export async function deleteBookmark(id: string): Promise<ServerError | void> {
  const supabase = createClient()
  const { error } = await supabase.from("bookmarks").delete().eq("id", id)
  if (error) return { error: { message: error.message } }
}
// #endregion deleteBookmark
