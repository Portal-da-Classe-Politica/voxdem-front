import { ReactNode } from 'react';
import Button from '../ui/Button';

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  description: string;
  buttonText?: string;
  buttonHref?: string;
  children?: ReactNode;
  className?: string;
}

export default function HeroSection({
  title,
  subtitle,
  description,
  buttonText = "Acessar Ferramenta",
  buttonHref = "#",
  children,
  className = ""
}: HeroSectionProps) {
  return (
    <section className={`bg-[#3D58F5] text-white py-16 ${className}`}>
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center min-h-[500px]">
        <div className="w-full lg:w-1/2 lg:pr-8 mb-8 lg:mb-0">
          <h1 className="text-4xl lg:text-6xl font-bold mb-4">{title}</h1>
          {subtitle && (
            <h2 className="text-xl lg:text-2xl mb-6 font-normal">{subtitle}</h2>
          )}
          <p className="text-base lg:text-lg mb-8 leading-relaxed">
            {description}
          </p>
          <Button href={buttonHref}>
            {buttonText}
          </Button>
        </div>
        {children && (
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end items-center">
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
