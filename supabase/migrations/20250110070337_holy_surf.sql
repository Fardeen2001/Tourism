/*
  # Initial Schema for World Tourism Blog

  1. New Tables
    - users (handled by Supabase Auth)
    - countries
      - id (uuid, primary key)
      - name (text)
      - slug (text)
      - created_at (timestamp)
    - categories
      - id (uuid, primary key)
      - name (text)
      - slug (text)
      - created_at (timestamp)
    - blogs
      - id (uuid, primary key)
      - title (text)
      - slug (text)
      - description (text)
      - content (text)
      - thumbnail_url (text)
      - meta_title (text)
      - meta_description (text)
      - country_id (uuid, foreign key)
      - category_id (uuid, foreign key)
      - author_id (uuid, foreign key)
      - published (boolean)
      - created_at (timestamp)
      - updated_at (timestamp)
    - trip_advisor_links
      - id (uuid, primary key)
      - blog_id (uuid, foreign key)
      - url (text)
      - title (text)
      - created_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access
    - Add policies for admin write access
*/

-- Create countries table
CREATE TABLE IF NOT EXISTS countries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create blogs table
CREATE TABLE IF NOT EXISTS blogs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text NOT NULL,
  content text NOT NULL,
  thumbnail_url text NOT NULL,
  meta_title text,
  meta_description text,
  country_id uuid REFERENCES countries(id),
  category_id uuid REFERENCES categories(id),
  author_id uuid REFERENCES auth.users(id),
  published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create trip advisor links table
CREATE TABLE IF NOT EXISTS trip_advisor_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  blog_id uuid REFERENCES blogs(id) ON DELETE CASCADE,
  url text NOT NULL,
  title text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE countries ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE trip_advisor_links ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Countries policies
CREATE POLICY "Allow public read access to countries"
  ON countries FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow admin write access to countries"
  ON countries FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'email' IN (SELECT email FROM auth.users WHERE auth.users.id = auth.uid()));

-- Categories policies
CREATE POLICY "Allow public read access to categories"
  ON categories FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow admin write access to categories"
  ON categories FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'email' IN (SELECT email FROM auth.users WHERE auth.users.id = auth.uid()));

-- Blogs policies
CREATE POLICY "Allow public read access to published blogs"
  ON blogs FOR SELECT
  TO public
  USING (published = true);

CREATE POLICY "Allow admin write access to blogs"
  ON blogs FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'email' IN (SELECT email FROM auth.users WHERE auth.users.id = auth.uid()));

-- Trip advisor links policies
CREATE POLICY "Allow public read access to trip advisor links"
  ON trip_advisor_links FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow admin write access to trip advisor links"
  ON trip_advisor_links FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'email' IN (SELECT email FROM auth.users WHERE auth.users.id = auth.uid()));

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS blogs_slug_idx ON blogs(slug);
CREATE INDEX IF NOT EXISTS blogs_country_id_idx ON blogs(country_id);
CREATE INDEX IF NOT EXISTS blogs_category_id_idx ON blogs(category_id);
CREATE INDEX IF NOT EXISTS blogs_created_at_idx ON blogs(created_at DESC);