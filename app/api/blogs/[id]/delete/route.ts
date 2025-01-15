import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function POST(
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

    revalidatePath('/admin/blogs');
    revalidatePath('/blogs');
    revalidatePath('/');

    return new NextResponse('OK');
  } catch (error) {
    console.error('Database Error:', error);
    return new NextResponse('Database Error', { status: 500 });
  }
}