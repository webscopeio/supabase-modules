"use server"

import { redirect as _redirect, type RedirectType } from "next/navigation"
import type {
  SignInAnonymouslyCredentials,
  SignInWithPasswordCredentials,
  SignInWithPasswordlessCredentials,
  SignUpWithPasswordCredentials,
  UserAttributes,
  VerifyOtpParams,
} from "@supabase/supabase-js"

import { createClient } from "@/modules/utils/server"

type WithRedirect<TArg = unknown> = TArg & {
  redirect?: {
    url?: string
    type?: RedirectType
  }
}

type ServerError = {
  error: { message: string }
}

// #region signUpWithEmailPassword
export async function signUpWithEmailPassword(
  options: WithRedirect<
    Extract<SignUpWithPasswordCredentials, { email: string }>
  >
): Promise<ServerError | void> {
  const { redirect, ...credentials } = options
  const supabase = createClient()
  const { data, error } = await supabase.auth.signUp(credentials)
  if (error) return { error: { message: error.message } }
  if (data.user?.identities?.length === 0) {
    return { error: { message: "User already registered" } }
  }
  redirect?.url && _redirect(redirect.url, redirect.type)
}
// #endregion signUpWithEmailPassword

// #region signInWithEmailPassword
export async function signInWithEmailPassword(
  options: WithRedirect<
    Extract<SignInWithPasswordCredentials, { email: string }>
  >
): Promise<ServerError | void> {
  const { redirect, ...credentials } = options
  const supabase = createClient()
  const { error } = await supabase.auth.signInWithPassword(credentials)
  if (error) return { error: { message: error.message } }
  redirect?.url && _redirect(redirect.url, redirect.type)
}
// #endregion signInWithEmailPassword

// #region signInWithOtp
export async function signInWithOtp(
  options: WithRedirect<
    Extract<SignInWithPasswordlessCredentials, { email: string }>
  >
): Promise<ServerError | void> {
  const { redirect, ...credentials } = options
  const supabase = createClient()
  const { error } = await supabase.auth.signInWithOtp(credentials)
  if (error) return { error: { message: error.message } }
  redirect?.url && _redirect(redirect.url, redirect.type)
}
// #endregion signInWithOtp

// #region signInAnonymously
export async function signInAnonymously(
  options: WithRedirect<SignInAnonymouslyCredentials>
): Promise<ServerError | void> {
  const { redirect, ...credentials } = options
  const supabase = createClient()
  const { error } = await supabase.auth.signInAnonymously(credentials)
  if (error) return { error: { message: error.message } }
  redirect?.url && _redirect(redirect.url, redirect.type)
}
// #endregion signInAnonymously

// #region verifyOtp
export async function verifyOtp(
  options: WithRedirect<
    Omit<Extract<VerifyOtpParams, { email: string }>, "type">
  >
): Promise<ServerError | void> {
  const { redirect, ...credentials } = options
  const supabase = createClient()
  const { error } = await supabase.auth.verifyOtp({
    email: credentials.email,
    token: credentials.token,
    type: "email",
  })
  if (error) return { error: { message: error.message } }
  redirect?.url && _redirect(redirect.url, redirect.type)
}
// #endregion verifyOtp

// #region resetPasswordForEmail
export async function resetPasswordForEmail(
  options: WithRedirect<{ email: string }>
): Promise<ServerError | void> {
  const { redirect, email } = options
  const supabase = createClient()
  const { error } = await supabase.auth.resetPasswordForEmail(email)
  if (error) return { error: { message: error.message } }
  redirect?.url && _redirect(redirect.url, redirect.type)
}
// #endregion resetPasswordForEmail

// #region signOut
export async function signOut(
  options: WithRedirect
): Promise<ServerError | void> {
  const { redirect } = options
  const supabase = createClient()
  const { error } = await supabase.auth.signOut()
  if (error) return { error: { message: error.message } }
  redirect?.url && _redirect(redirect.url, redirect.type)
}
// #endregion signOut

// #region updateUser
export async function updateUser(
  options: WithRedirect<UserAttributes>
): Promise<ServerError | void> {
  const { redirect, ...attributes } = options
  const supabase = createClient()
  const { error } = await supabase.auth.updateUser(attributes)
  if (error) return { error: { message: error.message } }
  redirect?.url && _redirect(redirect.url, redirect.type)
}
// #endregion updateUser
