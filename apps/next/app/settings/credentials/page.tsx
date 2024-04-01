import { createClient } from "@/modules/utils/server";
import { CredentialsForm } from "@/components/user/credentials-form";
import { redirect } from "next/navigation";

export default async function Page() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    redirect("/login");
  }

  return <CredentialsForm userEmail={user.email} />;
}
