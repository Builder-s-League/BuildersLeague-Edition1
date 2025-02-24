-- Drop existing trigger and function if they exist
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Create debug table if not exists
CREATE TABLE IF NOT EXISTS debug_logs (
    id SERIAL PRIMARY KEY,
    event_type TEXT,
    event_data JSONB,
    error_message TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Drop existing policies
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Allow profile creation" ON profiles;

-- Create updated policies with better security
CREATE POLICY "Users can view own profile"
    ON profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
    ON profiles FOR UPDATE
    USING (auth.uid() = id);

CREATE POLICY "CBH Admins can view all profiles"
    ON profiles FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 
            FROM public.profiles 
            WHERE id = auth.uid() 
            AND role = 3
        )
        OR auth.uid() = id
    );

CREATE POLICY "CBH Admins can update all profiles"
    ON profiles FOR UPDATE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 
            FROM public.profiles 
            WHERE id = auth.uid() 
            AND role = 3
        )
        OR auth.uid() = id
    );

CREATE POLICY "HR can view their employees profiles"
    ON profiles FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 
            FROM public.profiles 
            WHERE id = auth.uid() 
            AND role = 2
            AND admin_id = auth.uid()
        )
        OR auth.uid() = id
    );

-- Grant necessary permissions for debug logs
GRANT ALL ON public.debug_logs TO anon, authenticated;
GRANT USAGE, SELECT ON SEQUENCE debug_logs_id_seq TO anon, authenticated;

-- Create function to create profile on user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    -- Log attempt
    INSERT INTO debug_logs (event_type, event_data)
    VALUES ('profile_creation_attempt', jsonb_build_object('user_id', NEW.id, 'email', NEW.email));

    -- Insert into profiles table
    INSERT INTO public.profiles (
        id,
        name,
        contact_info,
        is_active,
        role,
        created_at,
        updated_at
    )
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'name', NEW.email),
        NULL,
        true,
        1,  -- Default to employee (1)
        NOW(),
        NOW()
    );

    RETURN NEW;
EXCEPTION WHEN OTHERS THEN
    -- Log error
    INSERT INTO debug_logs (event_type, event_data, error_message)
    VALUES (
        'profile_creation_error',
        jsonb_build_object('user_id', NEW.id, 'error', SQLERRM),
        SQLERRM
    );
    RAISE;
END;
$$;

-- Create trigger
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON public.profiles TO anon, authenticated;
GRANT ALL ON public.debug_logs TO anon, authenticated;

-- Grant sequence permissions if needed
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

-- Check debug logs with:
-- SELECT * FROM debug_logs ORDER BY created_at DESC LIMIT 5;