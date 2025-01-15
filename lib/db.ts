import { sql } from '@vercel/postgres';
import { unstable_cache } from 'next/cache';

// Cache the database queries for better performance
export const getLatestBlogs = unstable_cache(
  async () => {
    try {
      // First check if the tables exist
      const tableCheck = await sql`
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_schema = 'public' 
          AND table_name = 'blogs'
        );
      `;
      
      if (!tableCheck.rows[0].exists) {
        return []; // Return empty array if tables don't exist yet
      }

      const data = await sql`
        SELECT b.*, c.name as country_name, cat.name as category_name 
        FROM blogs b 
        LEFT JOIN countries c ON b.country_id = c.id 
        LEFT JOIN categories cat ON b.category_id = cat.id 
        WHERE b.published = true 
        ORDER BY b.created_at DESC 
        LIMIT 6
      `;
      return data.rows;
    } catch (error) {
      console.error('Database Error:', error);
      return []; // Return empty array instead of throwing error
    }
  },
  ['latest-blogs'],
  { revalidate: 60 } // Cache for 1 minute
);

export const getBlogBySlug = unstable_cache(
  async (slug: string) => {
    try {
      const data = await sql`
        SELECT b.*, c.name as country_name, cat.name as category_name 
        FROM blogs b 
        LEFT JOIN countries c ON b.country_id = c.id 
        LEFT JOIN categories cat ON b.category_id = cat.id 
        WHERE b.slug = ${slug} AND b.published = true
      `;
      return data.rows[0] || null;
    } catch (error) {
      console.error('Database Error:', error);
      return null;
    }
  },
  ['blog-by-slug'],
  { revalidate: 60 }
);

export const getBlogsByCategory = unstable_cache(
  async (categorySlug: string) => {
    try {
      const data = await sql`
        SELECT b.*, c.name as country_name, cat.name as category_name 
        FROM blogs b 
        LEFT JOIN countries c ON b.country_id = c.id 
        LEFT JOIN categories cat ON b.category_id = cat.id 
        WHERE cat.slug = ${categorySlug} AND b.published = true 
        ORDER BY b.created_at DESC
      `;
      return data.rows;
    } catch (error) {
      console.error('Database Error:', error);
      return [];
    }
  },
  ['blogs-by-category'],
  { revalidate: 60 }
);

export const getBlogsByCountry = unstable_cache(
  async (countrySlug: string) => {
    try {
      const data = await sql`
        SELECT b.*, c.name as country_name, cat.name as category_name 
        FROM blogs b 
        LEFT JOIN countries c ON b.country_id = c.id 
        LEFT JOIN categories cat ON b.category_id = cat.id 
        WHERE c.slug = ${countrySlug} AND b.published = true 
        ORDER BY b.created_at DESC
      `;
      return data.rows;
    } catch (error) {
      console.error('Database Error:', error);
      return [];
    }
  },
  ['blogs-by-country'],
  { revalidate: 60 }
);

export const getTripAdvisorLinks = unstable_cache(
  async (blogId: string) => {
    try {
      const data = await sql`
        SELECT * FROM trip_advisor_links 
        WHERE blog_id = ${blogId}
        ORDER BY created_at DESC
      `;
      return data.rows;
    } catch (error) {
      console.error('Database Error:', error);
      return [];
    }
  },
  ['trip-advisor-links'],
  { revalidate: 60 }
);