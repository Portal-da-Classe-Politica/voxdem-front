import Image from "next/image";

interface BlogCardProps {
  title: string;
  description: string;
  imageUrl?: string;
  imageAlt?: string;
  href?: string;
  className?: string;
}

export default function BlogCard({
  title,
  description,
  imageUrl = "/file.svg",
  imageAlt = "Content thumbnail",
  href = "#",
  className = ""
}: BlogCardProps) {
  const CardWrapper = href ? 'a' : 'div';
  
  return (
    <CardWrapper 
      href={href}
      className={`bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow block ${className}`}
    >
      <div className="p-4">
        <div className="bg-gray-200 w-full h-32 rounded mb-4 flex items-center justify-center">
          <Image 
            src={imageUrl} 
            alt={imageAlt} 
            width={48} 
            height={48} 
            className="opacity-40" 
          />
        </div>
        <h3 className="font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>
    </CardWrapper>
  );
}
