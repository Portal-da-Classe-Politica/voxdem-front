import Image from 'next/image';

interface Partner {
  name: string;
  logo: string;
  alt: string;
}

interface PartnersProps {
  partners?: Partner[];
  className?: string;
}

export default function Partners({
  partners = [
    { name: "ReDem", logo: "/svg/partners/redem logo.png", alt: "ReDem Logo" },
    { name: "CNPq", logo: "/svg/partners/cnpq.png", alt: "CNPq Logo" },
    { name: "inct", logo: "/svg/partners/inct.png", alt: "INCT Logo" },
    { name: "ARAUCÁRIA", logo: "/svg/partners/araucaria.png", alt: "Araucária Logo" }
  ],
  className = ""
}: PartnersProps) {
  return (
    <section className={`py-12 bg-white ${className}`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16 opacity-70 hover:opacity-100 transition-opacity duration-300">
          {partners.map((partner, index) => (
            <div key={index} className="flex items-center justify-center h-16 grayscale hover:grayscale-0 transition-all duration-300">
              <Image
                src={partner.logo}
                alt={partner.alt}
                width={120}
                height={60}
                className="object-contain max-h-16"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
