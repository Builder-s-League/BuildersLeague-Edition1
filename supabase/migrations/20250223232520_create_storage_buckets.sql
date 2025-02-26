-- Check and create storage bucket for profile images if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM storage.buckets
        WHERE id = 'CBH_ProfileImage'
    ) THEN
        INSERT INTO storage.buckets (id, name, public, avif_autodetection, file_size_limit, allowed_mime_types)
        VALUES (
            'CBH_ProfileImage',
            'CBH_ProfileImage',
            true, -- Make it public
            false,
            5242880, -- 5MB in bytes
            ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']::text[]
        );
    END IF;
END $$;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can upload their own profile image" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own profile image" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own profile image" ON storage.objects;
DROP POLICY IF EXISTS "Profile images are publicly accessible" ON storage.objects;

-- Create storage policy to allow authenticated users to upload their own profile image
CREATE POLICY "Users can upload their own profile image" ON storage.objects
    FOR INSERT
    TO authenticated
    WITH CHECK (
        bucket_id = 'CBH_ProfileImage' AND
        (storage.foldername(name))[1] = auth.uid()::text
    );

-- Allow users to update their own profile image
CREATE POLICY "Users can update their own profile image" ON storage.objects
    FOR UPDATE
    TO authenticated
    USING (
        bucket_id = 'CBH_ProfileImage' AND
        (storage.foldername(name))[1] = auth.uid()::text
    );

-- Allow users to delete their own profile image
CREATE POLICY "Users can delete their own profile image" ON storage.objects
    FOR DELETE
    TO authenticated
    USING (
        bucket_id = 'CBH_ProfileImage' AND
        (storage.foldername(name))[1] = auth.uid()::text
    );

-- Allow public access to profile images
CREATE POLICY "Profile images are publicly accessible" ON storage.objects
    FOR SELECT
    TO public
    USING (bucket_id = 'CBH_ProfileImage'); 