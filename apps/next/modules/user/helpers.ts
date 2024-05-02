import { User } from "@supabase/supabase-js"
import { z } from "zod"

export const UserMetadataSchema = z.object({
  hasPassword: z.boolean().default(true),
})

export function isAnonymousUser(user: User) {
  const userMetadata = UserMetadataSchema.parse(user?.user_metadata)

  return user.is_anonymous || !userMetadata.hasPassword
}
