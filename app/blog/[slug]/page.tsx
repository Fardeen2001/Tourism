import { getBlogBySlug, getTripAdvisorLinks } from '@/lib/db';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export default async function BlogPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const blog = await getBlogBySlug(slug);
  const tripAdvisorLinks = await getTripAdvisorLinks(blog.id);

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="relative h-[400px] mb-8">
            <Image
              src={blog.thumbnail_url}
              alt={blog.title}
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
          <div className="flex gap-2 mb-6">
            {blog.country_name && (
              <span className="text-sm text-gray-500">{blog.country_name}</span>
            )}
            {blog.category_name && (
              <span className="text-sm text-gray-500">• {blog.category_name}</span>
            )}
          </div>
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>
        <div className="lg:col-span-1">
          {tripAdvisorLinks.length > 0 && (
            <Card className="p-6 mb-8">
              <h3 className="text-xl font-semibold mb-4">Book Your Trip</h3>
              <div className="space-y-4">
                {tripAdvisorLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button className="w-full">{link.title}</Button>
                  </a>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}