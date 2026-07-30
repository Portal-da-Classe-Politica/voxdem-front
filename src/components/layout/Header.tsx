'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

type NavItem =
  | { type: 'link'; label: string; href: string }
  | { type: 'dropdown'; label: string; items: Array<{ label: string; href: string }> }
  | { type: 'button'; label: string; href: string; external?: boolean };

interface HeaderProps {
  instituteName?: string;
  navigationItems?: NavItem[];
}

const defaultNavigationItems: NavItem[] = [
  { type: 'link', label: 'Home', href: '/' },
  {
    type: 'dropdown',
    label: 'Sobre o projeto',
    items: [
      { label: 'Equipe', href: '/equipe' },
      { label: 'Comitê Científico', href: '/comite-cientifico' },
    ],
  },
  { type: 'link', label: 'Documentação', href: '/documentacao' },
  { type: 'link', label: 'Data Playground', href: '/dados' },
  { type: 'button', label: 'DataDem', href: 'https://redem.c3sl.ufpr.br/blog/', external: true },
];

export default function Header({ 
  instituteName = "Instituto Nacional de Ciência, Tecnologia e Inovação | Representação e Legitimidade Democrática | ReDem",
  navigationItems = defaultNavigationItems
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<number | null>(null);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActiveRoute = (href: string) => {
    return pathname === href;
  };

  const isActiveDropdown = (items: Array<{ href: string }>) => {
    return items.some((subItem) => isActiveRoute(subItem.href));
  };

  return (
    <header className="bg-[#3D58F5] text-white min-h-[100px] flex items-center relative z-50 py-2">
      <div className="container mx-auto px-4 flex justify-between items-center w-full">
        <div className="flex items-center min-w-0">
          <p className="text-xs lg:text-sm text-white">
            {instituteName}
          </p>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6 shrink-0">
          {navigationItems.map((item, index) => {
            if (item.type === 'link') {
              return (
                <Link 
                  key={index} 
                  href={item.href} 
                  className={`text-white text-sm whitespace-nowrap transition-all duration-200 ${
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
              );
            }

            if (item.type === 'dropdown') {
              return (
                <div key={index} className="relative group">
                  <button
                    type="button"
                    className={`flex items-center gap-1 text-white text-sm whitespace-nowrap transition-all duration-200 cursor-pointer ${
                      isActiveDropdown(item.items) ? 'font-bold' : 'hover:text-gray-200'
                    }`}
                  >
                    {item.label}
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className="absolute left-0 top-full pt-2 hidden group-hover:block">
                    <div className="bg-white rounded-md shadow-lg py-2 min-w-[200px]">
                      {item.items.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          href={subItem.href}
                          className={`block px-4 py-2 text-sm whitespace-nowrap text-[#3D58F5] hover:bg-gray-100 ${
                            isActiveRoute(subItem.href) ? 'font-bold' : ''
                          }`}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <a
                key={index}
                href={item.href}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
                className="bg-black text-white text-sm font-semibold whitespace-nowrap px-5 py-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                {item.label}
              </a>
            );
          })}
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
          {navigationItems.map((item, index) => {
            if (item.type === 'link') {
              return (
                <Link 
                  key={index} 
                  href={item.href} 
                  onClick={() => setIsMenuOpen(false)}
                  className={`block py-3 text-white text-sm transition-all duration-200 border-b border-white/10 last:border-b-0 ${
                    isActiveRoute(item.href) ? 'font-bold bg-white/10 px-3 -mx-3 rounded' : 'hover:text-gray-200 hover:pl-2'
                  }`}
                >
                  {item.label}
                </Link>
              );
            }

            if (item.type === 'dropdown') {
              const isOpen = openMobileDropdown === index;
              return (
                <div key={index} className="border-b border-white/10">
                  <button
                    type="button"
                    onClick={() => setOpenMobileDropdown(isOpen ? null : index)}
                    className={`w-full flex items-center justify-between py-3 text-white text-sm transition-all duration-200 ${
                      isActiveDropdown(item.items) ? 'font-bold' : 'hover:text-gray-200'
                    }`}
                  >
                    {item.label}
                    <svg 
                      className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className={`overflow-hidden transition-all duration-200 ${isOpen ? 'max-h-40 pb-2' : 'max-h-0'}`}>
                    {item.items.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        href={subItem.href}
                        onClick={() => {
                          setIsMenuOpen(false);
                          setOpenMobileDropdown(null);
                        }}
                        className={`block py-2 pl-4 text-white text-sm ${
                          isActiveRoute(subItem.href) ? 'font-bold' : 'hover:text-gray-200'
                        }`}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }

            return (
              <a
                key={index}
                href={item.href}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
                onClick={() => setIsMenuOpen(false)}
                className="block text-center mt-4 bg-black text-white text-sm font-semibold py-3 rounded-lg"
              >
                {item.label}
              </a>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
