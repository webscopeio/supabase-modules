import { revalidateCache } from "@/modules/utils/cache";
import { useSupabaseClient } from "@/modules/utils/client";
import type {
  AuthError,
  AuthResponse,
  AuthTokenResponse,
  SignInWithPasswordCredentials,
  SignUpWithPasswordCredentials,
  UserAttributes,
  UserResponse,
} from "@supabase/supabase-js";
import type { MutationOptions, UseMutationResult } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

interface AuthHook<TData, TError, TVariables> {
  (options?: MutationOptions<TData, TError, TVariables>): UseMutationResult<
    TData,
    TError,
    TVariables
  >;
}

export const useSignUpWithEmailPassword: AuthHook<
  AuthResponse["data"],
  AuthResponse["error"],
  Extract<SignUpWithPasswordCredentials, { email: string }>
> = (options) => {
  const supabase = useSupabaseClient();
  return useMutation({
    mutationFn: async (credentials) => {
      const { data, error } = await supabase.auth.signUp(credentials);
      if (error) {
        throw error;
      }
      if (data.user?.identities?.length === 0) {
        throw new Error("User already registered");
      }
      revalidateCache();
      return data;
    },
    ...options,
  });
};

export const useSignInWithEmailPassword: AuthHook<
  AuthTokenResponse["data"],
  AuthTokenResponse["error"],
  Extract<SignInWithPasswordCredentials, { email: string }>
> = (options) => {
  const supabase = useSupabaseClient();
  return useMutation({
    mutationFn: async (credentials) => {
      const { data, error } = await supabase.auth.signInWithPassword(
        credentials
      );
      if (error) {
        throw error;
      }
      revalidateCache();
      return data;
    },
    ...options,
  });
};

export const useSignOut: AuthHook<unknown, AuthTokenResponse["error"], void> = (
  options
) => {
  const supabase = useSupabaseClient();
  return useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
      revalidateCache();
    },
    ...options,
  });
};

export const useUpdateUser: AuthHook<
  UserResponse["data"],
  AuthError | null,
  UserAttributes
> = (options) => {
  const supabase = useSupabaseClient();
  return useMutation({
    mutationFn: async (attributes) => {
      const { data, error } = await supabase.auth.updateUser(attributes);

      if (error) {
        throw error;
      }

      revalidateCache();
      return data;
    },
    ...options,
  });
};
