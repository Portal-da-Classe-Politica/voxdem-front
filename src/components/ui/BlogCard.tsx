import Image from "next/image";

interface BlogCardProps {
  title: string;
  description: string;
  category?: string;
  imageUrl?: string;
  imageAlt?: string;
  href?: string;
  className?: string;
}

export default function BlogCard({
  title,
  description,
  category,
  imageUrl = "/file.svg",
  imageAlt = "Content thumbnail",
  href = "#",
  className = ""
}: BlogCardProps) {
  const CardWrapper = href ? 'a' : 'div';
  const isExternal = href && /^https?:\/\//.test(href);
  
  return (
    <CardWrapper 
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className={`bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow block ${className}`}
    >
      <div className="p-4">
        <div className="bg-gray-200 w-full h-32 rounded mb-4 overflow-hidden relative">
          <Image 
            src={imageUrl} 
            alt={imageAlt} 
            fill
            className="object-cover" 
          />
        </div>
        {category && (
          <span className="inline-block px-2 py-1 text-xs font-medium text-yellow-700 bg-yellow-100 rounded mb-2">
            {category}
          </span>
        )}
        <h3 className="font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-sm text-gray-600 leading-relaxed line-clamp-4">
          {description}
        </p>
      </div>
    </CardWrapper>
  );
}
