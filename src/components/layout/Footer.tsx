
import Link from 'next/link';
import Image from 'next/image';

interface FooterProps {
  brandName?: string;
  menuItems?: Array<{
    label: string;
    href: string;
  }>;
  contactInfo?: {
    phone: string;
    email: string;
  };
  socialLinks?: Array<{
    platform: string;
    href: string;
    icon: string;
  }>;
  copyright?: string;
}

export default function Footer({
  brandName = "VoxDem",
  menuItems = [
    { label: "Home", href: "/" },
    // { label: "Sobre", href: "/sobre" },
    { label: "Data Playground", href: "/dados" },
    // { label: "Contato", href: "/contato" }
  ],
  contactInfo = {
    phone: "(00) 000000000",
    email: "contato@email.com"
  },
  socialLinks = [
    { platform: "Facebook", href: "#", icon: "/svg/icons/facebook.svg" },
    { platform: "Instagram", href: "#", icon: "/svg/icons/instagram.svg" }
  ],
  copyright = "Copyright © 2025. Todos os direitos reservados."
}: FooterProps) {
  return (
    <footer className="bg-[#3D58F5] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Image src="/images/logo-voxdem.png" alt="VoxDem" width={180} height={54} />
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Menu</h4>
            <ul className="space-y-2">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <Link href={item.href} className="text-white hover:text-gray-200">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contato</h4>
            <div className="space-y-2">
              <p className="flex items-center">
                <Image src="/svg/icons/call.svg" alt="Telefone" width={24} height={24} className="mr-2" />
                {contactInfo.phone}
              </p>
              <p className="flex items-center">
                <Image src="/svg/icons/mail.svg" alt="Email" width={24} height={24} className="mr-2" />
                {contactInfo.email}
              </p>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Redes Sociais</h4>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.href} 
                  className="text-white hover:text-gray-200"
                  aria-label={link.platform}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image src={link.icon} alt={link.platform} width={24} height={24} className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-8 pt-4 text-center">
          <p className="text-sm">{copyright}</p>
        </div>
      </div>
    </footer>
  );
}
