'use client';

import Link from 'next/link';
import Badge from '@/components/ui/Badge';

export default function Logo({
  variant = 'default',
  showVersion = false,
  size = 'md',
  className = '',
  href = '/dashboard',
}) {
  const sizes = {
    sm: {
      title: 'text-lg',
      subtitle: 'text-xs',
    },
    md: {
      title: 'text-2xl',
      subtitle: 'text-sm',
    },
    lg: {
      title: 'text-3xl',
      subtitle: 'text-base',
    },
  };

  const variants = {
    default: 'text-gradient',
    white: 'text-white',
    dark: 'text-gray-900',
  };

  const LogoContent = () => (
    <div className={className}>
      <h2 className={`${sizes[size].title} ${variants[variant]} font-bold`}>
        POS-Soft
      </h2>
      <div className="flex items-center gap-2 mt-1">
        <p
          className={`${sizes[size].subtitle} ${
            variant === 'white' ? 'text-gray-200' : 'text-gray-600'
          }`}
        >
          Accounting System
        </p>
        {showVersion && (
          <Badge variant="purple" size="sm">
            v1.0.0
          </Badge>
        )}
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        <LogoContent />
      </Link>
    );
  }

  return <LogoContent />;
}
