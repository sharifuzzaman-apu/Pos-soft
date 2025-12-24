'use client';

import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

export default function StatsCard({
  title,
  value,
  trend,
  trendValue,
  badgeText,
  badgeVariant = 'info',
  valueColor = 'text-gray-900',
  className = '',
}) {
  return (
    <Card className={`${className}`}>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <p className="text-sm text-gray-600">{title}</p>
          {badgeText && (
            <Badge variant={badgeVariant} size="sm">
              {badgeText}
            </Badge>
          )}
        </div>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
        {trend && (
          <p className="text-xs text-gray-600">
            {trend === 'up' ? 'Increase' : 'Decrease'} {trendValue}
          </p>
        )}
      </div>
    </Card>
  );
}
