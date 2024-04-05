create table "public"."bookmarks" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "title" text not null,
    "description" text not null,
    "url" text not null,
    "image_url" text,
    "created_by" uuid not null,
    "tags" text[]
);


alter table "public"."bookmarks" enable row level security;

CREATE UNIQUE INDEX bookmarks_pkey ON public.bookmarks USING btree (id);

alter table "public"."bookmarks" add constraint "bookmarks_pkey" PRIMARY KEY using index "bookmarks_pkey";

alter table "public"."bookmarks" add constraint "bookmarks_created_by_fkey" FOREIGN KEY (created_by) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."bookmarks" validate constraint "bookmarks_created_by_fkey";

grant delete on table "public"."bookmarks" to "anon";

grant insert on table "public"."bookmarks" to "anon";

grant references on table "public"."bookmarks" to "anon";

grant select on table "public"."bookmarks" to "anon";

grant trigger on table "public"."bookmarks" to "anon";

grant truncate on table "public"."bookmarks" to "anon";

grant update on table "public"."bookmarks" to "anon";

grant delete on table "public"."bookmarks" to "authenticated";

grant insert on table "public"."bookmarks" to "authenticated";

grant references on table "public"."bookmarks" to "authenticated";

grant select on table "public"."bookmarks" to "authenticated";

grant trigger on table "public"."bookmarks" to "authenticated";

grant truncate on table "public"."bookmarks" to "authenticated";

grant update on table "public"."bookmarks" to "authenticated";

grant delete on table "public"."bookmarks" to "service_role";

grant insert on table "public"."bookmarks" to "service_role";

grant references on table "public"."bookmarks" to "service_role";

grant select on table "public"."bookmarks" to "service_role";

grant trigger on table "public"."bookmarks" to "service_role";

grant truncate on table "public"."bookmarks" to "service_role";

grant update on table "public"."bookmarks" to "service_role";

create policy "Enable delete for users based on created_by"
on "public"."bookmarks"
as permissive
for delete
to public
using ((auth.uid() = created_by));


create policy "Enable insert for authenticated users only"
on "public"."bookmarks"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for all users"
on "public"."bookmarks"
as permissive
for select
to public
using (true);


create policy "Enable update for users based on created_by"
on "public"."bookmarks"
as permissive
for update
to public
using ((auth.uid() = created_by))
with check ((auth.uid() = created_by));



