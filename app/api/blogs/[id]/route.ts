import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
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

    await sql`
      UPDATE blogs
      SET title = ${title},
          slug = ${slug},
          description = ${description},
          content = ${content},
          thumbnail_url = ${thumbnail_url},
          country_id = ${country_id},
          category_id = ${category_id},
          meta_title = ${meta_title},
          meta_description = ${meta_description},
          published = ${published},
          updated_at = now()
      WHERE id = ${params.id}
      AND author_id = ${session.user.id}
    `;

    return new NextResponse('OK');
  } catch (error) {
    console.error('Database Error:', error);
    return new NextResponse('Database Error', { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  
  if (!session?.user) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    await sql`
      DELETE FROM blogs
      WHERE id = ${params.id}
      AND author_id = ${session.user.id}
    `;

    return new NextResponse('OK');
  } catch (error) {
    console.error('Database Error:', error);
    return new NextResponse('Database Error', { status: 500 });
  }
}