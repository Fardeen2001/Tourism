import { sql } from '@vercel/postgres';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function AdminDashboard() {
  const stats = await sql`
    SELECT 
      COUNT(*) as total_blogs,
      COUNT(*) FILTER (WHERE published = true) as published_blogs
    FROM blogs
  `;

  const { total_blogs, published_blogs } = stats.rows[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>
        <Link href="/admin/blogs/new">
          <Button>Add New Blog</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-2">Total Blogs</h3>
          <p className="text-3xl font-bold">{total_blogs}</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-2">Published Blogs</h3>
          <p className="text-3xl font-bold">{published_blogs}</p>
        </Card>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Quick Actions</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/admin/blogs">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-medium mb-2">Manage Blogs</h3>
            <p className="text-gray-600">View, edit, and delete blog posts</p>
          </Card>
        </Link>
        <Link href="/admin/countries">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-medium mb-2">Manage Countries</h3>
            <p className="text-gray-600">Add and edit destination countries</p>
          </Card>
        </Link>
        <Link href="/admin/categories">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-medium mb-2">Manage Categories</h3>
            <p className="text-gray-600">Add and edit blog categories</p>
          </Card>
        </Link>
      </div>
    </div>
  );
}