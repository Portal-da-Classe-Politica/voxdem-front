import BlogCard from '../ui/BlogCard';
import { blogService } from '../../services/blogService';

interface ContentSectionProps {
  title?: string;
  className?: string;
}

export default async function ContentSection({
  title = "Últimos conteúdos",
  className = ""
}: ContentSectionProps) {
  const posts = (await blogService.getLatestPosts(4)).slice(0, 4);

  if (posts.length === 0) {
    return null;
  }

  return (
    <section className={`py-16 bg-white ${className}`}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-gray-800">
          <span className="border-l-4 border-yellow-500 pl-4">{title}</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.map((post) => (
            <BlogCard
              key={post.id}
              title={post.title}
              description={post.description}
              category={post.category}
              imageUrl={post.imageUrl}
              imageAlt={post.imageAlt}
              href={post.href}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
