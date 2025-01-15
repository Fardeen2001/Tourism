import { getBlogsByCategory } from '@/lib/db';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export default async function CategoryPage({
  params: { category },
}: {
  params: { category: string };
}) {
  const blogs = await getBlogsByCategory(category);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8">
        {blogs[0]?.category_name || category} Destinations
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <Card key={blog.id} className="overflow-hidden">
            <div className="relative h-48">
              <Image
                src={blog.thumbnail_url}
                alt={blog.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
              <p className="text-gray-600 mb-4 line-clamp-2">{blog.description}</p>
              <Link href={`/blog/${blog.slug}`}>
                <Button>Read More</Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}