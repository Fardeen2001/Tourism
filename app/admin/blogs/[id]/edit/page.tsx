'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

export default function EditBlog({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [blog, setBlog] = useState<any>(null);
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [blogRes, countriesRes, categoriesRes] = await Promise.all([
          fetch(`/api/blogs/${params.id}/edit`),
          fetch('/api/countries'),
          fetch('/api/categories')
        ]);

        if (!blogRes.ok) throw new Error('Failed to fetch blog');
        if (!countriesRes.ok) throw new Error('Failed to fetch countries');
        if (!categoriesRes.ok) throw new Error('Failed to fetch categories');

        const blogData = await blogRes.json();
        const countriesData = await countriesRes.json();
        const categoriesData = await categoriesRes.json();

        setBlog(blogData);
        setContent(blogData.content);
        setCountries(countriesData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error:', error);
      }
    }

    fetchData();
  }, [params.id]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    formData.append('content', content);

    try {
      const response = await fetch(`/api/blogs/${params.id}/edit`, {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to update blog');
      }

      router.push('/admin/blogs');
      router.refresh();
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  }

  if (!blog) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-6">Edit Blog Post</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" defaultValue={blog.title} required />
            </div>

            <div>
              <Label htmlFor="slug">Slug</Label>
              <Input id="slug" name="slug" defaultValue={blog.slug} required />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" defaultValue={blog.description} required />
            </div>

            <div>
              <Label htmlFor="thumbnail_url">Thumbnail URL</Label>
              <Input id="thumbnail_url" name="thumbnail_url" type="url" defaultValue={blog.thumbnail_url} required />
            </div>

            <div>
              <Label htmlFor="country">Country</Label>
              <Select name="country_id" defaultValue={blog.country_id}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country: any) => (
                    <SelectItem key={country.id} value={country.id}>
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <Select name="category_id" defaultValue={blog.category_id}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category: any) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="content">Content</Label>
              <div className="mt-2">
                <ReactQuill
                  theme="snow"
                  value={content}
                  onChange={setContent}
                  className="h-64 mb-12"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="meta_title">Meta Title</Label>
              <Input id="meta_title" name="meta_title" defaultValue={blog.meta_title} />
            </div>

            <div>
              <Label htmlFor="meta_description">Meta Description</Label>
              <Textarea id="meta_description" name="meta_description" defaultValue={blog.meta_description} />
            </div>

            <div className="flex items-center gap-2">
              <Switch id="published" name="published" defaultChecked={blog.published} />
              <Label htmlFor="published">Published</Label>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Updating...' : 'Update Blog Post'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}