import { NextResponse, type NextRequest } from "next/server"
import { type EmailOtpType } from "@supabase/supabase-js"

import { createClient } from "@/database/client/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get("type") as EmailOtpType | null
  const token_hash = searchParams.get("token_hash")
  const next = searchParams.get("next") ?? "/auth"

  const redirectTo = request.nextUrl.clone()
  redirectTo.pathname = next
  redirectTo.searchParams.delete("next")
  redirectTo.searchParams.delete("token_hash")
  redirectTo.searchParams.delete("type")

  if (token_hash && type) {
    const supabase = createClient()

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    })

    if (error) {
      redirectTo.pathname = "/auth"
      redirectTo.searchParams.set(
        "error",
        JSON.stringify({ message: error.message, status: error.status || 401 })
      )
    }

    if (type === "recovery") {
      redirectTo.pathname = "/auth/update"
    }

    return NextResponse.redirect(redirectTo)
  }
}
