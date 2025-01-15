import { getLatestBlogs } from '@/lib/db';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export default async function Home() {
  const latestBlogs = await getLatestBlogs();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Explore the World with Us
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Discover amazing destinations, travel tips, and insider guides to make your next adventure unforgettable.
        </p>
      </section>

      {/* Latest Posts */}
      <section>
        <h2 className="text-3xl font-bold mb-8">Latest Adventures</h2>
        {latestBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestBlogs.map((blog) => (
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
                  <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {blog.description}
                  </p>
                  <Link href={`/blog/${blog.slug}`}>
                    <Button>Read More</Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">No blog posts available yet. Check back soon!</p>
          </div>
        )}
      </section>
    </div>
  );
}