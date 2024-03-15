import { OtpLoginForm } from "@/components/user/otp-login-form";
import { useSupabaseServer } from "@/modules/utils/server";
import { cookies } from "next/headers";

import { redirect } from "next/navigation";
import { z } from "zod";

const emailSchema = z.object({
  email: z.string().email(),
});

export default async function Page({
  searchParams,
}: {
  searchParams: { email?: string };
}) {
  const supabase = useSupabaseServer({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/settings");
  }

  if (!searchParams.email) {
    redirect("/login");
  }

  const res = emailSchema.safeParse({ email: searchParams.email });

  if (!res.success) {
    redirect("/login");
  }

  return (
    <div className="grid min-h-dvh items-center">
      <OtpLoginForm email={searchParams.email} />
    </div>
  );
}
