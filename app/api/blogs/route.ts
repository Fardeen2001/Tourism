import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';

export async function POST(request: Request) {
  const session = await auth();
  
  if (!session?.user) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const formData = await request.formData();
    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string;
    const description = formData.get('description') as string;
    const content = formData.get('content') as string;
    const thumbnail_url = formData.get('thumbnail_url') as string;
    const country_id = formData.get('country_id') as string;
    const category_id = formData.get('category_id') as string;
    const meta_title = formData.get('meta_title') as string;
    const meta_description = formData.get('meta_description') as string;
    const published = formData.get('published') === 'true';

    const result = await sql`
      INSERT INTO blogs (
        title, slug, description, content, thumbnail_url,
        country_id, category_id, meta_title, meta_description,
        published, author_id
      ) VALUES (
        ${title}, ${slug}, ${description}, ${content}, ${thumbnail_url},
        ${country_id}, ${category_id}, ${meta_title}, ${meta_description},
        ${published}, ${session.user.id}
      )
      RETURNING id
    `;

    return NextResponse.json({ id: result.rows[0].id });
  } catch (error) {
    console.error('Database Error:', error);
    return new NextResponse('Database Error', { status: 500 });
  }
}