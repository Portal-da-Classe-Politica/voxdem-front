import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'secondary' | 'blue';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
}

export default function Button({ 
  children, 
  onClick, 
  href, 
  variant = 'primary', 
  size = 'md',
  className = '',
  disabled = false
}: ButtonProps) {
  const baseClasses = 'font-semibold rounded-md transition-colors inline-flex items-center justify-center';
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-8 py-3 text-base',
    lg: 'px-10 py-4 text-lg'
  };

  const variantClasses = {
    primary: 'bg-white text-[#3D58F5] hover:bg-gray-100',
    secondary: 'bg-[#3D58F5] text-white hover:bg-[#2A45E5]',
    blue: 'bg-[#3D58F5] text-white hover:bg-[#2A45E5]'
  };

  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';

  const buttonClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${disabledClasses} ${className}`;

  if (href) {
    return (
      <a href={href} className={buttonClasses}>
        {children}
      </a>
    );
  }

  return (
    <button 
      onClick={disabled ? undefined : onClick} 
      className={buttonClasses}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
