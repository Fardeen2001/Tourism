import { sql } from '@vercel/postgres';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export default async function AdminBlogs() {
  const blogs = await sql`
    SELECT b.*, c.name as country_name, cat.name as category_name 
    FROM blogs b 
    LEFT JOIN countries c ON b.country_id = c.id 
    LEFT JOIN categories cat ON b.category_id = cat.id 
    ORDER BY b.created_at DESC
  `;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Manage Blogs</h1>
        <Link href="/admin/blogs/new">
          <Button>Add New Blog</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {blogs.rows.map((blog) => (
          <Card key={blog.id} className="p-6">
            <div className="flex items-center gap-6">
              <div className="relative h-32 w-48">
                <Image
                  src={blog.thumbnail_url}
                  alt={blog.title}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                <div className="flex gap-2 mb-2">
                  {blog.country_name && (
                    <span className="text-sm text-gray-500">{blog.country_name}</span>
                  )}
                  {blog.category_name && (
                    <span className="text-sm text-gray-500">• {blog.category_name}</span>
                  )}
                </div>
                <p className="text-gray-600 line-clamp-2 mb-4">{blog.description}</p>
                <div className="flex gap-4">
                  <Link href={`/admin/blogs/${blog.id}/edit`}>
                    <Button variant="outline">Edit</Button>
                  </Link>
                  <DeleteBlogButton id={blog.id} />
                </div>
              </div>
              <div className="flex items-center">
                <span className={`px-3 py-1 rounded-full text-sm ${
                  blog.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {blog.published ? 'Published' : 'Draft'}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function DeleteBlogButton({ id }: { id: string }) {
  return (
    <form action={`/api/blogs/${id}/delete`} method="POST">
      <Button variant="destructive" type="submit">Delete</Button>
    </form>
  );
}