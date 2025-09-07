'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface HeaderProps {
  instituteName?: string;
  navigationItems?: Array<{
    label: string;
    href: string;
  }>;
}

export default function Header({ 
  instituteName = "Instituto Nacional de Ciência, Tecnologia e Inovação | Representação e legitimidade democrática | Belém",
  navigationItems = [
    { label: "Home", href: "/" },
    { label: "Sobre", href: "/sobre" },
    { label: "Data Playgorund", href: "/dados" },
    { label: "Contato", href: "/contato" }
  ]
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActiveRoute = (href: string) => {
    return pathname === href;
  };

  return (
    <header className="bg-[#3D58F5] text-white h-[100px] flex items-center relative z-50">
      <div className="container mx-auto px-4 flex justify-between items-center w-full">
        <div className="flex items-center">
          <p className="text-xs lg:text-sm text-white">
            {instituteName}
          </p>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex space-x-6">
          {navigationItems.map((item, index) => (
            <Link 
              key={index} 
              href={item.href} 
              className={`text-white text-sm transition-all duration-200 ${
                isActiveRoute(item.href) ? 'font-bold' : 'hover:text-gray-200'
              }`}
              onMouseEnter={(e) => {
                if (!isActiveRoute(item.href)) {
                  (e.target as HTMLElement).style.textShadow = '0 0 1px currentColor';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActiveRoute(item.href)) {
                  (e.target as HTMLElement).style.textShadow = 'none';
                }
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="lg:hidden flex items-center justify-center w-10 h-10 cursor-pointer z-10"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            // Close icon (X)
            <svg 
              className="w-8 h-8 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M6 18L18 6M6 6l12 12" 
              />
            </svg>
          ) : (
            // Hamburger icon
            <svg 
              className="w-8 h-8 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 6h16M4 12h16M4 18h16" 
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`lg:hidden absolute top-full left-0 w-full bg-[#3D58F5] border-t border-white/20 shadow-lg transition-all duration-300 ${
        isMenuOpen ? 'opacity-100 visible transform translate-y-0' : 'opacity-0 invisible transform -translate-y-2'
      }`}>
        <nav className="container mx-auto px-4 py-4">
          {navigationItems.map((item, index) => (
            <Link 
              key={index} 
              href={item.href} 
              onClick={() => setIsMenuOpen(false)}
              className={`block py-3 text-white text-sm transition-all duration-200 border-b border-white/10 last:border-b-0 ${
                isActiveRoute(item.href) ? 'font-bold bg-white/10 px-3 -mx-3 rounded' : 'hover:text-gray-200 hover:pl-2'
              }`}
              onMouseEnter={(e) => {
                if (!isActiveRoute(item.href)) {
                  (e.target as HTMLElement).style.textShadow = '0 0 1px currentColor';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActiveRoute(item.href)) {
                  (e.target as HTMLElement).style.textShadow = 'none';
                }
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
