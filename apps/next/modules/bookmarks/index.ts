"use server"

import { z } from "zod"

import { Database } from "@/modules/types"
import { createClient } from "@/modules/utils/server"

type Bookmark = Database["public"]["Tables"]["bookmarks"]["Row"]

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
}): Promise<Bookmark[] | null> {
  const supabase = createClient()
  return supabase
    .from("bookmarks")
    .select("*")
    .eq("created_by", id)
    .order("created_at", { ascending: false })
    .throwOnError()
    .then(({ data }) => data)
}
// #endregion getBookmarks

// #region createBookmark
export async function createBookmark({
  created_by,
  url,
}: {
  created_by: string
  url: string
}): Promise<void> {
  const response = await fetch(`https://api.dub.co/metatags?url=${url}`)
  if (!response.ok) throw new Error(`Error: ${response.status}`)
  const unparsedData = (await response.json()) as unknown
  const { title, description, image } = bookmarkSchema.parse(unparsedData)

  const supabase = createClient()
  await supabase
    .from("bookmarks")
    .insert({
      created_by,
      url,
      title,
      description,
      image_url: image ?? null,
    })
    .throwOnError()
}
// #endregion createBookmark

// #region deleteBookmark
export async function deleteBookmark(id: string): Promise<void> {
  const supabase = createClient()
  await supabase.from("bookmarks").delete().eq("id", id).throwOnError()
}
// #endregion deleteBookmark
