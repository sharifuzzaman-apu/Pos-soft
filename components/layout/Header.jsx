'use client';

import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { useRouter } from 'next/navigation';

export default function Header({
  title,
  subtitle,
  badge,
  showBack = false,
  action,
  className = '',
}) {
  const router = useRouter();

  return (
    <div className={`flex items-center justify-between mb-6 ${className}`}>
      <div className="flex items-center gap-4">
        {/* Back Button */}
        {showBack && (
          <Button
            variant="secondary"
            size="sm"
            onClick={() => router.back()}
            className="flex-shrink-0"
          >
            Back
          </Button>
        )}

        {/* Title & Subtitle */}
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
            {badge && <Badge variant="purple">{badge}</Badge>}
          </div>
          {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
        </div>
      </div>

      {/* Action Slot */}
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
}
