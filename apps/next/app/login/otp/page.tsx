import { cookies } from "next/headers";
import { OtpLoginForm } from "@/components/user/otp-login-form";
import { redirect } from "next/navigation";
import { useSupabaseServer } from "@/modules/utils/server";
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

  return <OtpLoginForm email={searchParams.email} />;
}
