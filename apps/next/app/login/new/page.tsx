import { createClient } from "@/modules/utils/server";
import { redirect } from "next/navigation";
import { RegisterForm } from "@/components/user/register-form";

export default async function Page() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/settings/accounts");
  }

  return <RegisterForm />;
}
