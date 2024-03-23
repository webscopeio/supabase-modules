import { Database } from "@/modules/types";
import type { PostgrestError } from "@supabase/supabase-js";
import { useSupabaseClient } from "@/modules/utils/client";
import type {
  MutationOptions,
  UseMutationResult,
  UseQueryResult,
} from "@tanstack/react-query";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];

type ProfileQuery = ({
  id,
}: {
  id: Profile["id"];
}) => UseQueryResult<Profile | null>;

export const useGetProfile: ProfileQuery = ({ id }) => {
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

type ProfileHook<TData, TError, TVariables> = (
  options?: MutationOptions<TData, TError, TVariables>
) => UseMutationResult<TData, TError, TVariables>;

export const useUpdateProfile: ProfileHook<
  Profile | undefined,
  PostgrestError,
  Partial<Profile>
> = (options) => {
  const supabase = useSupabaseClient();
  const queryClient = useQueryClient();
  return useMutation<Profile | undefined, PostgrestError, Partial<Profile>>({
    mutationFn: async (profileUpdates) => {
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
      await queryClient.invalidateQueries({ queryKey: [userData.id] });

      return userData;
    },
    ...options,
  });
};
