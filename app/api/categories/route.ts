import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';

export async function GET() {
  try {
    const categories = await sql`SELECT * FROM categories ORDER BY name ASC`;
    return NextResponse.json(categories.rows);
  } catch (error) {
    console.error('Database Error:', error);
    return new NextResponse('Database Error', { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await auth();
  
  if (!session?.user) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const { name, slug } = await request.json();

    const result = await sql`
      INSERT INTO categories (name, slug)
      VALUES (${name}, ${slug})
      RETURNING *
    `;

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Database Error:', error);
    return new NextResponse('Database Error', { status: 500 });
  }
}