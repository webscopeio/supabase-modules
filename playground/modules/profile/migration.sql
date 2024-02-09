-- Create `public.profiles` table
CREATE TABLE public.profiles (
  user_id UUID PRIMARY KEY REFERENCES auth.users (id) ON DELETE CASCADE NOT NULL,
  email VARCHAR(255) UNIQUE,
  username VARCHAR(128) UNIQUE,
  avatar TEXT,
  preferred_name TEXT,
  first_name TEXT,
  last_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS on `public.profiles` table
ALTER TABLE
  public.profiles ENABLE ROW LEVEL SECURITY;

-- Set replica identity to full to send previous data on `UPDATE` `DELETE` operations
ALTER TABLE
  public.profiles REPLICA IDENTITY FULL;

-- Set unrestricted SELECT policy on public.profiles table
CREATE POLICY "profiles_select_policy" ON public.profiles AS PERMISSIVE FOR
SELECT
  TO public USING (true) -- Set restricted INSET policy on public.profiles table based on auth
  CREATE POLICY "profiles_insert_policy" ON public.profiles AS PERMISSIVE FOR
INSERT
  TO authenticated WITH CHECK (true) -- Set restricted UPDATE policy on public.profiles table based on `user_id`
  CREATE POLICY "profiles_update_policy" ON public.profiles AS PERMISSIVE FOR
UPDATE
  TO public USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id) -- Populate public.profiles table with new user id and email values.
  CREATE
  OR REPLACE FUNCTION create_profile() RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $ $ BEGIN
INSERT INTO
  public.profiles (user_id, email)
VALUES
  (NEW.id, NEW.email);

RETURN NEW;

END;

$ $;

-- Create a trigger to listen for insert operations on auth.users table
CREATE TRIGGER create_profile_trigger
AFTER
INSERT
  ON auth.users FOR each ROW EXECUTE FUNCTION create_profile_for_user();