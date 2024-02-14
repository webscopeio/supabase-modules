import type { PostgrestError } from "@supabase/supabase-js";
import type {
  MutationOptions,
  UseMutationResult,
  UseQueryResult,
} from "@tanstack/react-query";
import { useMutation, useQuery } from "@tanstack/react-query";

import type { Database } from "../types";
import { useSupabaseClient } from "../utils/supabase-client";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];

export const useGetProfile = ({
  id,
}: {
  id: string;
}): UseQueryResult<Profile | null> => {
  const supabase = useSupabaseClient();
  return useQuery({
    queryKey: [id],
    queryFn: async () => {
      return await supabase
        .from("profiles")
        .select("*")
        .eq("id", id)
        .single()
        .throwOnError()
        .then(({ data }) => data);
    },
  });
};

export const useUpdateProfile = (
  options?: MutationOptions<
    Profile | undefined,
    PostgrestError,
    Partial<Profile>
  >
): UseMutationResult<Profile | undefined, PostgrestError, Partial<Profile>> => {
  const supabase = useSupabaseClient();
  return useMutation<Profile | undefined, PostgrestError, Partial<Profile>>({
    mutationFn: async (profileUpdates): Promise<Profile | undefined> => {
      if (!profileUpdates.id) {
        throw new Error("Attempt error - an error occurred with your update");
      }

      const { data, error } = await supabase
        .from("profiles")
        .update({
          ...profileUpdates,
        })
        .eq("id", profileUpdates.id)
        .select();

      if (error) {
        throw error;
      }
      if (data.length < 1) {
        throw new Error("Response error - an error occurred with your update");
      }

      const [userData] = data;

      return userData;
    },
    ...options,
  });
};
