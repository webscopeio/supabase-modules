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

type SignUpWithEmailPasswordCredentials = Extract<
  SignUpWithPasswordCredentials,
  { email: string }
>;

type UseSignUpWithEmailPassword<TData, TError, TVariables> = (
  options?: MutationOptions<TData, TError, TVariables>
) => UseMutationResult<TData, TError, TVariables>;

export const useSignUpWithEmailPassword: UseSignUpWithEmailPassword<
  AuthResponse["data"],
  AuthResponse["error"],
  SignUpWithEmailPasswordCredentials
> = (options) => {
  const supabase = useSupabaseClient();
  return useMutation({
    mutationFn: async (credentials) => {
      const { data, error } = await supabase.auth.signUp({
        ...credentials,
        options: {
          emailRedirectTo: `${location.origin}/auth/callback`,
          ...credentials.options,
        },
      });
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

type SignInWithEmailPasswordCredentials = Extract<
  SignInWithPasswordCredentials,
  { email: string }
>;

type UseSignInWithEmailPassword<TData, TError, TVariables> = (
  options?: MutationOptions<TData, TError, TVariables>
) => UseMutationResult<TData, TError, TVariables>;

export const useSignInWithEmailPassword: UseSignInWithEmailPassword<
  AuthTokenResponse["data"],
  AuthTokenResponse["error"],
  SignInWithEmailPasswordCredentials
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

type UseSignOut<TError> = (
  options?: MutationOptions<unknown, TError>
) => UseMutationResult<unknown, TError, void, unknown>;

export const useSignOut: UseSignOut<AuthTokenResponse["error"]> = (options) => {
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

type UseUpdateUser<TData, TError, TVariables> = (
  options?: MutationOptions<TData, TError, TVariables>
) => UseMutationResult<TData, TError, TVariables>;

export const useUpdateUser: UseUpdateUser<
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
