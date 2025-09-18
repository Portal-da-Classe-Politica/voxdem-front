'use client';

interface FloatingButtonProps {
  href: string;
  text?: string;
  className?: string;
}

export default function FloatingButton({ 
  href, 
  text = "Pesquisa",
  className = '' 
}: FloatingButtonProps) {
  return (
    <div className="fixed bottom-8 right-8 z-50">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`
          group flex items-center justify-center gap-3
          bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700
          hover:from-blue-700 hover:via-purple-700 hover:to-blue-800
          text-white font-semibold
          px-6 py-4 rounded-2xl
          shadow-xl hover:shadow-2xl
          transition-all duration-300 ease-out
          transform hover:scale-105 hover:-translate-y-1
          border border-white/20
          backdrop-blur-sm
          ${className}
        `}
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #667eea 100%)',
          boxShadow: '0 20px 40px -10px rgba(102, 126, 234, 0.4), 0 10px 20px -5px rgba(118, 75, 162, 0.3)',
        }}
        aria-label="Ir para pesquisa no Google Forms"
      >
        {/* Ícone de lupa */}
        <svg 
          className="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          strokeWidth={2.5}
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
          />
        </svg>
        
        {/* Texto sempre visível */}
        <span className="text-sm font-medium tracking-wide">
          {text}
        </span>

        {/* Efeito de brilho */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </a>
    </div>
  );
}