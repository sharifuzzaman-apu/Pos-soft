'use client';

import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

export default function BalanceCard({
  title,
  amount,
  subtitle,
  variant = 'purple',
  showBadge = false,
  badgeText,
  className = '',
}) {
  const variants = {
    purple: 'border-purple-300',
    green: 'border-green-300',
    blue: 'border-blue-300',
    red: 'border-red-300',
    orange: 'border-orange-300',
    gray: 'border-gray-300',
  };

  return (
    <Card
      className={`bg-white border ${
        variants[variant] || variants.gray
      } text-gray-900 ${className}`}
    >
      <div className="flex items-center justify-between">
        {/* Left - Info */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <p className="text-sm text-gray-600">{title}</p>
            {showBadge && badgeText && (
              <Badge
                variant="gray"
                size="sm"
                className="bg-gray-100 text-gray-700 border border-gray-200"
              >
                {badgeText}
              </Badge>
            )}
          </div>
          <p className="text-4xl font-bold text-gray-900 mb-1">
            ৳
            {amount.toLocaleString('en-US', {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </p>
          {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
        </div>
      </div>
    </Card>
  );
}
