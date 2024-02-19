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
import type { MutationOptions } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

type SignUpWithEmailPasswordCredentials = Extract<
  SignUpWithPasswordCredentials,
  { email: string }
>;

export const useSignUpWithEmailPassword = (
  options?: MutationOptions<
    AuthResponse["data"],
    AuthResponse["error"],
    SignUpWithEmailPasswordCredentials
  >
) => {
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

export const useSignInWithEmailPassword = (
  options?: MutationOptions<
    AuthTokenResponse["data"],
    AuthTokenResponse["error"],
    SignInWithEmailPasswordCredentials
  >
) => {
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

export const useSignOut = (
  options?: MutationOptions<unknown, AuthTokenResponse["error"]>
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

type UseUpdateUser = MutationOptions<
  UserResponse["data"],
  AuthError | null,
  UserAttributes
>;

export const useUpdateUser = (
  options: {
    onSuccess?: UseUpdateUser["onSuccess"];
    onError?: UseUpdateUser["onError"];
  } = {}
) => {
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
