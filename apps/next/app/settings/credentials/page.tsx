import { cookies } from "next/headers";
import { CredentialsForm } from "@/components/user/credentials-form";
import { redirect } from "next/navigation";
import { useSupabaseServer } from "@/modules/utils/server";

export default async function Page() {
  const supabase = useSupabaseServer({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    redirect("/login");
  }

  return <CredentialsForm userEmail={user.email} />;
}
