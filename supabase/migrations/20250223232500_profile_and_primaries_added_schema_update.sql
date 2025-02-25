-- First drop all existing tables and functions
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

DROP TABLE IF EXISTS Notes CASCADE;
DROP TABLE IF EXISTS TopicProgress CASCADE;
DROP TABLE IF EXISTS Feedbacks CASCADE;
DROP TABLE IF EXISTS Schedule_Organizations CASCADE;
DROP TABLE IF EXISTS Schedules CASCADE;
DROP TABLE IF EXISTS CBH_banned_words CASCADE;
DROP TABLE IF EXISTS Organization_Banned_Words CASCADE;
DROP TABLE IF EXISTS Survey CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;
DROP TABLE IF EXISTS Users CASCADE;

-- Recreate all tables
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name VARCHAR(255),
    email VARCHAR(255),
    contact_info VARCHAR(255),
    is_active BOOLEAN DEFAULT true,
    role INT, -- 1 -> employee, 2 -> hr/org  3 -> cbh(admin)
    admin_id UUID REFERENCES auth.users(id),
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);

CREATE TABLE Notes (
    id SERIAL PRIMARY KEY,
    textrange INT ARRAY,
    note_content TEXT,
    topic_id INT,
    employee_id UUID REFERENCES auth.users(id),
    is_public BOOLEAN,
    is_approved_cbh BOOLEAN,
    is_approved_emp BOOLEAN,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE TABLE TopicProgress (
    topic_id INT,
    employee_id UUID REFERENCES auth.users(id),
    content_id INT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE TABLE Feedbacks (
    id SERIAL PRIMARY KEY,
    content TEXT,
    employee_id UUID REFERENCES auth.users(id),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE TABLE Schedules (
    id SERIAL PRIMARY KEY,
    topic_id VARCHAR(255),
    cbh_admin_id UUID REFERENCES auth.users(id),
    schedule_at TIMESTAMP,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE TABLE Schedule_Organizations (
    id SERIAL PRIMARY KEY,
    parent_id INT REFERENCES Schedules(id) ON DELETE CASCADE,
    organization_id UUID REFERENCES auth.users(id),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE TABLE CBH_banned_words (
    id SERIAL PRIMARY KEY,
    banned_word VARCHAR(255),
    cbh_admin_id UUID REFERENCES auth.users(id),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE TABLE Organization_Banned_Words (
    id SERIAL PRIMARY KEY,
    banned_word VARCHAR(255),
    organization_id UUID REFERENCES auth.users(id),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE TABLE Survey (
    id SERIAL PRIMARY KEY,
    link VARCHAR(255),
    organization_id UUID REFERENCES auth.users(id),
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    status BOOLEAN
);

-- Create trigger function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
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
END;
$$;

-- Create trigger
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public profiles are viewable by everyone"
    ON profiles FOR SELECT
    USING (true);

CREATE POLICY "Users can update own profile"
    ON profiles FOR UPDATE
    USING (auth.uid() = id);

CREATE POLICY "Allow profile creation"
    ON profiles FOR INSERT
    WITH CHECK (true);


-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON public.profiles TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated; 