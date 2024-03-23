import { cookies } from "next/headers";
import { LoginForm } from "@/components/user/login-form";
import { redirect } from "next/navigation";
import { useSupabaseServer } from "@/modules/utils/server";

export default async function Page() {
  const supabase = useSupabaseServer({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/settings");
  }

  return <LoginForm />;
}
