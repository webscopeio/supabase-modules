import { createClient } from "@/modules/utils/server";
import { redirect } from "next/navigation";
import { ResetPasswordForm } from "@/components/user/reset-password-form";

export default async function Page() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/settings");
  }

  return <ResetPasswordForm />;
}
