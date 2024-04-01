import { createClient } from "@/modules/utils/server";
import { NewResetPasswordForm } from "@/components/user/new-reset-password-form";
import { redirect } from "next/navigation";

export default async function Page() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return <NewResetPasswordForm />;
}
