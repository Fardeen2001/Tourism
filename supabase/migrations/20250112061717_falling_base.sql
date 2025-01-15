/*
  # Initial Schema Setup

  1. New Tables
    - `countries`
      - `id` (uuid, primary key)
      - `name` (text)
      - `slug` (text, unique)
      - `created_at` (timestamp)
    - `categories`
      - `id` (uuid, primary key)
      - `name` (text)
      - `slug` (text, unique)
      - `created_at` (timestamp)
    - `blogs`
      - `id` (uuid, primary key)
      - `title` (text)
      - `slug` (text, unique)
      - `description` (text)
      - `content` (text)
      - `thumbnail_url` (text)
      - `meta_title` (text)
      - `meta_description` (text)
      - `country_id` (uuid, foreign key)
      - `category_id` (uuid, foreign key)
      - `author_id` (uuid, foreign key)
      - `published` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    - `trip_advisor_links`
      - `id` (uuid, primary key)
      - `blog_id` (uuid, foreign key)
      - `url` (text)
      - `title` (text)
      - `created_at` (timestamp)

  2. Initial Data
    - Sample countries
    - Sample categories
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

-- Insert sample countries
INSERT INTO countries (name, slug) VALUES
('United States', 'usa'),
('India', 'india'),
('Japan', 'japan'),
('France', 'france'),
('Italy', 'italy')
ON CONFLICT (slug) DO NOTHING;

-- Insert sample categories
INSERT INTO categories (name, slug) VALUES
('Beaches', 'beaches'),
('Mountains', 'mountains'),
('Cities', 'cities'),
('Culture', 'culture'),
('Food', 'food')
ON CONFLICT (slug) DO NOTHING;