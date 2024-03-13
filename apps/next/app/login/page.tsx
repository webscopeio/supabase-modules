import { LoginForm } from "@/components/user/login-form";
import { useSupabaseServer } from "@/modules/utils/server";
import { cookies } from "next/headers";

import { redirect } from "next/navigation";

export default async function Page() {
  const supabase = useSupabaseServer({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/settings");
  }

  return (
    <div className="min-h-dvh grid items-center">
      <LoginForm />
    </div>
  );
}
