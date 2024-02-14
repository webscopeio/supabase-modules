import { useSupabaseServer } from "@/modules/utils/supabase-server";
import { cookies } from "next/headers";
import { LoginForm } from "./LoginForm";
import { redirect } from "next/navigation";

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
