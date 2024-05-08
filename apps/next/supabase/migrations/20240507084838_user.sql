create table "public"."profiles" (
    "id" uuid not null,
    "created_at" timestamp with time zone not null default now(),
    "username" text not null,
    "preferred_name" text,
    "full_name" text,
    "updated_at" timestamp with time zone not null default now(),
    "email" character varying not null,
    "preferred_hue" text not null
);


alter table "public"."profiles" enable row level security;

CREATE UNIQUE INDEX profiles_email_key ON public.profiles USING btree (email);

CREATE UNIQUE INDEX profiles_pkey ON public.profiles USING btree (id);

CREATE UNIQUE INDEX profiles_username_key ON public.profiles USING btree (username);

alter table "public"."profiles" add constraint "profiles_pkey" PRIMARY KEY using index "profiles_pkey";

alter table "public"."profiles" add constraint "profiles_email_key" UNIQUE using index "profiles_email_key";

alter table "public"."profiles" add constraint "profiles_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."profiles" validate constraint "profiles_id_fkey";

alter table "public"."profiles" add constraint "profiles_username_key" UNIQUE using index "profiles_username_key";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$BEGIN
  INSERT INTO public.profiles (id, email, username, preferred_hue)
  VALUES (NEW.id, NEW.email, NEW.email, floor(random() * 360)::text);

  RETURN NEW;
END;$function$
;

grant delete on table "public"."profiles" to "anon";

grant insert on table "public"."profiles" to "anon";

grant references on table "public"."profiles" to "anon";

grant select on table "public"."profiles" to "anon";

grant trigger on table "public"."profiles" to "anon";

grant truncate on table "public"."profiles" to "anon";

grant update on table "public"."profiles" to "anon";

grant delete on table "public"."profiles" to "authenticated";

grant insert on table "public"."profiles" to "authenticated";

grant references on table "public"."profiles" to "authenticated";

grant select on table "public"."profiles" to "authenticated";

grant trigger on table "public"."profiles" to "authenticated";

grant truncate on table "public"."profiles" to "authenticated";

grant update on table "public"."profiles" to "authenticated";

grant delete on table "public"."profiles" to "service_role";

grant insert on table "public"."profiles" to "service_role";

grant references on table "public"."profiles" to "service_role";

grant select on table "public"."profiles" to "service_role";

grant trigger on table "public"."profiles" to "service_role";

grant truncate on table "public"."profiles" to "service_role";

grant update on table "public"."profiles" to "service_role";

create policy "Enable delete for users based on id"
on "public"."profiles"
as permissive
for delete
to public
using ((auth.uid() = id));


create policy "Enable insert for authenticated users only"
on "public"."profiles"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for all users"
on "public"."profiles"
as permissive
for select
to public
using (true);


create policy "Enable update for users based on id"
on "public"."profiles"
as permissive
for update
to public
using ((auth.uid() = id))
with check ((auth.uid() = id));


CREATE TRIGGER handle_new_user_trigger AFTER INSERT ON auth.users FOR EACH ROW WHEN ((new.is_anonymous IS FALSE)) EXECUTE FUNCTION handle_new_user();

CREATE OR REPLACE FUNCTION public.update_user_email()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$BEGIN
  UPDATE public.profiles 
  SET email = NEW.email
  WHERE id = NEW.id;

  RETURN NEW;
END;$function$
;

CREATE TRIGGER update_email_in_profiles_trigger AFTER UPDATE OF email ON auth.users FOR EACH ROW WHEN ((old.is_anonymous IS FALSE)) EXECUTE FUNCTION update_user_email();

CREATE TRIGGER handle_user_becomes_permanent_trigger AFTER UPDATE OF email ON auth.users FOR EACH ROW WHEN (((old.email IS null) AND (new.email IS not null))) EXECUTE FUNCTION handle_new_user();

SELECT cron.schedule (
    'anonymous-users-cleanup',
    '30 3 * * 6', -- Saturday at 3:30am (GMT)
    $$ DELETE FROM auth.users WHERE is_anonymous = TRUE; $$
);









