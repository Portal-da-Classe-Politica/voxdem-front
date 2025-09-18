import BlogCard from '../ui/BlogCard';

interface ContentItem {
  title: string;
  description: string;
  imageUrl?: string;
  href?: string;
}

interface ContentSectionProps {
  title?: string;
  items?: ContentItem[];
  className?: string;
}

export default function ContentSection({
  title = "Últimos conteúdos",
  items = [
    {
      title: "Lorem Ipsum",
      description: "Lorem Sed ut perspiciatis unde omnis iste natus error sit voluptatem industry. Lorem ipsum has been the industry's standard dummy text ever since the 1500s.",
      imageUrl: "/images/blog/DSC_0042.JPG"
    },
    {
      title: "Lorem Ipsum",
      description: "Lorem Sed ut perspiciatis unde omnis iste natus error sit voluptatem industry. Lorem ipsum has been the industry's standard dummy text ever since the 1500s.",
      imageUrl: "/images/blog/DSC_0065.JPG"
    },
    {
      title: "Lorem Ipsum",
      description: "Lorem Sed ut perspiciatis unde omnis iste natus error sit voluptatem industry. Lorem ipsum has been the industry's standard dummy text ever since the 1500s.",
      imageUrl: "/images/blog/DSC_0357.JPG"
    },
    {
      title: "Lorem Ipsum",
      description: "Lorem Sed ut perspiciatis unde omnis iste natus error sit voluptatem industry. Lorem ipsum has been the industry's standard dummy text ever since the 1500s.",
      imageUrl: "/images/blog/DSC_0426.JPG"
    }
  ],
  className = ""
}: ContentSectionProps) {
  return (
    <section className={`py-16 bg-white ${className}`}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-gray-800">
          <span className="border-l-4 border-yellow-500 pl-4">{title}</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, index) => (
            <BlogCard
              key={index}
              title={item.title}
              description={item.description}
              imageUrl={item.imageUrl}
              href={item.href}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
