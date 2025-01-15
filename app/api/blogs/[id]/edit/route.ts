import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  
  if (!session?.user) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const blog = await sql`
      SELECT b.*, c.name as country_name, cat.name as category_name 
      FROM blogs b 
      LEFT JOIN countries c ON b.country_id = c.id 
      LEFT JOIN categories cat ON b.category_id = cat.id 
      WHERE b.id = ${params.id}
      AND b.author_id = ${session.user.id}
    `;

    if (!blog.rows[0]) {
      return new NextResponse('Blog not found', { status: 404 });
    }

    return NextResponse.json(blog.rows[0]);
  } catch (error) {
    console.error('Database Error:', error);
    return new NextResponse('Database Error', { status: 500 });
  }
}

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

    revalidatePath('/admin/blogs');
    revalidatePath('/blogs');
    revalidatePath(`/blog/${slug}`);
    revalidatePath('/');

    return new NextResponse('OK');
  } catch (error) {
    console.error('Database Error:', error);
    return new NextResponse('Database Error', { status: 500 });
  }
}