'use client';

import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Empty from '@/components/ui/Empty';
import { format } from 'date-fns';
import Link from 'next/link';

export default function RecentTransactions({
  transactions = [],
  limit = 5,
  showViewAll = true,
  className = '',
}) {
  const recentTransactions = transactions.slice(0, limit);

  if (transactions.length === 0) {
    return (
      <Card title="Recent Transactions" className={className}>
        <Empty
          icon="📭"
          title="No Transactions"
          message="No recent transactions available"
        />
      </Card>
    );
  }

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'bkash':
        return '📱';
      case 'cash':
        return '💵';
      case 'expense':
        return '🛒';
      default:
        return '📄';
    }
  };

  const getTransactionColor = (type) => {
    switch (type) {
      case 'bkash':
        return 'text-pink-600';
      case 'cash':
        return 'text-green-600';
      case 'expense':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <Card
      title="Recent Transactions"
      subtitle={`Last ${recentTransactions.length} transactions`}
      headerAction={
        showViewAll && (
          <Link href="/dashboard/history">
            <Button variant="outline" size="sm">
              View All
            </Button>
          </Link>
        )
      }
      className={className}
    >
      <div className="space-y-2">
        {recentTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-200"
          >
            {/* Left - Icon & Info */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <span className="text-2xl flex-shrink-0">
                {getTransactionIcon(transaction.type)}
              </span>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-gray-900 capitalize">
                    {transaction.type}
                  </p>
                  {transaction.category && (
                    <Badge variant="gray" size="sm">
                      {transaction.category}
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-gray-500">
                  {format(new Date(transaction.date), 'dd MMM, hh:mm a')}
                </p>
              </div>
            </div>

            {/* Right - Amount */}
            <p
              className={`text-lg font-bold ${getTransactionColor(
                transaction.type
              )} flex-shrink-0`}
            >
              {transaction.type === 'expense' ? '-' : '+'}৳
              {transaction.amount.toLocaleString('en-US')}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}
