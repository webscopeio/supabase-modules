import { createClient } from "@/modules/utils/server";
import { LoginForm } from "@/components/user/login-form";
import { redirect } from "next/navigation";

export default async function Page() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/settings/accounts");
  }

  return <LoginForm />;
}
