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
    const blog_id = formData.get('blog_id') as string;
    const url = formData.get('url') as string;
    const title = formData.get('title') as string;

    await sql`
      INSERT INTO trip_advisor_links (blog_id, url, title)
      VALUES (${blog_id}, ${url}, ${title})
    `;

    return new NextResponse('OK');
  } catch (error) {
    console.error('Database Error:', error);
    return new NextResponse('Database Error', { status: 500 });
  }
}