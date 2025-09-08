interface LoadingSpinnerProps {
  fullScreen?: boolean;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export default function LoadingSpinner({ 
  fullScreen = false, 
  size = 'lg',
  showText = true 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-6xl md:text-7xl'
  };

  const containerClasses = fullScreen 
    ? "fixed inset-0 bg-blue-600 flex items-center justify-center z-50 animate-fade-in-scale"
    : "flex items-center justify-center p-8 bg-blue-600 rounded-lg";

  return (
    <div className={containerClasses}>
      <div className="text-center">
        <div className="relative">
          {/* Logo VoxDem com animação */}
          <h1 className={`${sizeClasses[size]} font-bold text-white tracking-wider animate-pulse select-none animate-glow`}>
            VoxDem
          </h1>
          
          {/* Linha animada embaixo do texto */}
          <div className="mt-6 mx-auto w-32 h-1 bg-white/30 rounded-full overflow-hidden">
            <div className="h-full bg-white rounded-full animate-loading-line shadow-lg"></div>
          </div>
          
          {/* Pontos de loading */}
          <div className="flex justify-center mt-8 space-x-2">
            <div 
              className="w-3 h-3 bg-white rounded-full animate-bounce shadow-lg"
              style={{ animationDelay: '0s' }}
            ></div>
            <div 
              className="w-3 h-3 bg-white rounded-full animate-bounce shadow-lg"
              style={{ animationDelay: '0.1s' }}
            ></div>
            <div 
              className="w-3 h-3 bg-white rounded-full animate-bounce shadow-lg"
              style={{ animationDelay: '0.2s' }}
            ></div>
          </div>
          
          {/* Texto de carregamento */}
          {showText && (
            <p className="text-white/80 text-sm mt-6 animate-pulse">
              Carregando...
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
