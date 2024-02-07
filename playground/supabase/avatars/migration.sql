-- Create `storage.buckets` avatars bucket
INSERT INTO
  storage.buckets (id, name, "public")
VALUES
  ('avatars', 'avatars', true);

-- Set unrestricted INSERT policy on avatars storage bucket
CREATE POLICY "avatars_insert_policy" on storage.objects FOR
INSERT
  WITH CHECK (bucket_id = "avatars");

-- Set unrestricted UPDATE policy on avatars storage bucket
CREATE POLICY "avatars_update_policy" on storage.objects FOR
UPDATE
  USING (auth.uid() = owner) WITH CHECK (bucket_id = "avatars");

-- Set DELETE policy on avatars storage bucket by username
CREATE POLICY "avatars_delete_policy" on storage.objects FOR DELETE USING (auth.uid() = owner);