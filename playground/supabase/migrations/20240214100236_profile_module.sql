create table "public"."profile" (
    "id" uuid not null,
    "created_at" timestamp with time zone not null default now(),
    "username" text not null,
    "preferred_name" text,
    "full_name" text,
    "updated_at" timestamp with time zone not null default now(),
    "email" character varying not null
);


alter table "public"."profile" enable row level security;

CREATE UNIQUE INDEX profile_email_key ON public.profile USING btree (email);

CREATE UNIQUE INDEX profile_pkey ON public.profile USING btree (id);

CREATE UNIQUE INDEX profile_username_key ON public.profile USING btree (username);

alter table "public"."profile" add constraint "profile_pkey" PRIMARY KEY using index "profile_pkey";

alter table "public"."profile" add constraint "profile_email_key" UNIQUE using index "profile_email_key";

alter table "public"."profile" add constraint "profile_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."profile" validate constraint "profile_id_fkey";

alter table "public"."profile" add constraint "profile_username_key" UNIQUE using index "profile_username_key";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$BEGIN
  INSERT INTO public.profile (id, email, username)
  VALUES (NEW.id, NEW.email, NEW.email);

  RETURN NEW;
END;$function$
;

grant delete on table "public"."profile" to "anon";

grant insert on table "public"."profile" to "anon";

grant references on table "public"."profile" to "anon";

grant select on table "public"."profile" to "anon";

grant trigger on table "public"."profile" to "anon";

grant truncate on table "public"."profile" to "anon";

grant update on table "public"."profile" to "anon";

grant delete on table "public"."profile" to "authenticated";

grant insert on table "public"."profile" to "authenticated";

grant references on table "public"."profile" to "authenticated";

grant select on table "public"."profile" to "authenticated";

grant trigger on table "public"."profile" to "authenticated";

grant truncate on table "public"."profile" to "authenticated";

grant update on table "public"."profile" to "authenticated";

grant delete on table "public"."profile" to "service_role";

grant insert on table "public"."profile" to "service_role";

grant references on table "public"."profile" to "service_role";

grant select on table "public"."profile" to "service_role";

grant trigger on table "public"."profile" to "service_role";

grant truncate on table "public"."profile" to "service_role";

grant update on table "public"."profile" to "service_role";

create policy "Enable delete for users based on id"
on "public"."profile"
as permissive
for delete
to public
using ((auth.uid() = id));


create policy "Enable insert for authenticated users only"
on "public"."profile"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for all users"
on "public"."profile"
as permissive
for select
to public
using (true);


create policy "Enable update for users based on id"
on "public"."profile"
as permissive
for update
to public
using ((auth.uid() = id))
with check ((auth.uid() = id));



