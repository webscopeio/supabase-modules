import { ProfileForm } from "@/components/user/profile-form";
import { useSupabaseServer } from "@/modules/utils/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
  const supabase = useSupabaseServer({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="grid min-h-dvh items-center">
      <ProfileForm userId={user.id} />
    </div>
  );
}
