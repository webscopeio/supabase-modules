import type { PostgrestError } from "@supabase/supabase-js";
import type {
  MutationOptions,
  UseMutationResult,
  UseQueryResult,
} from "@tanstack/react-query";
import { useMutation, useQuery } from "@tanstack/react-query";

import type { Database } from "../types/database";
import { useSupabaseClient } from "../utils/supabase-client";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];

export const useGetAvatar = ({
  profile,
}: {
  profile?: Profile | null;
}): UseQueryResult<{ userInitials?: string; alt?: string; src?: string }> => {
  const supabase = useSupabaseClient();
  return useQuery<{ userInitials?: string; alt?: string; src?: string }>({
    enabled: !!profile,
    queryKey: [profile?.avatar],
    queryFn: async () => {
      const userInitials =
        profile?.first_name && profile?.last_name
          ? `${profile.first_name[0]}${profile.last_name[0]}`
          : undefined;
      const alt = profile?.username ?? undefined;

      if (!profile?.avatar) {
        return { userInitials, alt, src: undefined };
      }

      const { data, error } = await supabase.storage
        .from("avatars")
        .download(profile.avatar);
      if (error) throw error;
      return {
        userInitials,
        alt,
        src: data ? URL.createObjectURL(data) : undefined,
      };
    },
  });
};

export const useUpdateAvatar = (
  options?: MutationOptions<
    void,
    PostgrestError,
    { path: string; fileBody: File }
  >,
): UseMutationResult<
  void,
  PostgrestError,
  { path: string; fileBody: File }
> => {
  const supabase = useSupabaseClient();
  return useMutation<void, PostgrestError, { path: string; fileBody: File }>({
    mutationFn: async ({ path, fileBody }) => {
      const { error } = await supabase.storage
        .from("avatars")
        .upload(path, fileBody, { upsert: true });

      if (error) {
        throw error;
      }
    },
    ...options,
  });
};

export const useDeleteAvatar = (
  options?: MutationOptions<void, PostgrestError, { path: string }>,
): UseMutationResult<void, PostgrestError, { path: string }> => {
  const supabase = useSupabaseClient();
  return useMutation<void, PostgrestError, { path: string }>({
    mutationFn: async ({ path }) => {
      const { error } = await supabase.storage.from("avatars").remove([path]);

      if (error) {
        throw error;
      }
    },
    ...options,
  });
};
