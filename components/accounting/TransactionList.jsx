'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Empty from '@/components/ui/Empty';
import { format } from 'date-fns';

export default function TransactionList({
  transactions = [],
  type = 'bkash', // bkash, cash, expense
  onDelete,
  showActions = true,
  className = '',
}) {
  const [selectedId, setSelectedId] = useState(null);

  if (transactions.length === 0) {
    return (
      <Card className={className}>
        <Empty
          icon="📭"
          title="No Transactions"
          message="No transactions found.  Add your first transaction!"
        />
      </Card>
    );
  }

  const getTypeConfig = () => {
    switch (type) {
      case 'bkash':
        return {
          color: 'text-pink-600',
          bgColor: 'bg-pink-50',
          label: 'bKash',
        };
      case 'cash':
        return {
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          label: 'Cash',
        };
      case 'expense':
        return {
          color: 'text-red-600',
          bgColor: 'bg-red-50',
          label: 'Expense',
        };
      default:
        return {
          color: 'text-gray-600',
          bgColor: 'bg-gray-50',
          label: 'General',
        };
    }
  };

  const config = getTypeConfig();

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      if (onDelete) onDelete(id);
    }
  };

  return (
    <Card
      title="Transactions"
      subtitle={`Total: ${transactions.length} transaction${
        transactions.length > 1 ? 's' : ''
      }`}
      className={className}
    >
      <div className="space-y-3">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className={`p-4 rounded-lg border-2 transition-all ${
              selectedId === transaction.id
                ? 'border-purple-300 bg-purple-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setSelectedId(transaction.id)}
          >
            <div className="flex items-start justify-between gap-4">
              {/* Left - Icon & Info */}
              <div className="flex items-start gap-3 flex-1">
                <div
                  className={`w-16 h-10 ${config.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}
                >
                  <span className="text-xs font-semibold uppercase tracking-wide text-gray-700">
                    {config.label}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  {/* Amount */}
                  <p className={`text-xl font-bold ${config.color}`}>
                    {type === 'expense' ? '-' : '+'}৳
                    {transaction.amount.toLocaleString('en-US')}
                  </p>

                  {/* Date */}
                  <div className="mt-1 text-sm text-gray-600">
                    {format(new Date(transaction.date), 'dd MMM yyyy')}
                  </div>

                  {/* bKash specific info */}
                  {type === 'bkash' && (
                    <div className="flex items-center gap-3 mt-2 text-xs">
                      <Badge variant="warning" size="sm">
                        Charge: ৳{transaction.charge?.toFixed(2)}
                      </Badge>
                      <Badge variant="success" size="sm">
                        Bank: ৳{transaction.bankAmount?.toFixed(2)}
                      </Badge>
                    </div>
                  )}

                  {/* Expense specific info */}
                  {type === 'expense' && (
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="purple" size="sm">
                        {transaction.category}
                      </Badge>
                      <Badge variant="info" size="sm">
                        {transaction.paymentMethod === 'cash'
                          ? 'Cash Payment'
                          : 'Bank Payment'}
                      </Badge>
                    </div>
                  )}

                  {/* Note */}
                  {transaction.note && (
                    <div className="mt-2 text-sm text-gray-600">
                      <span className="font-semibold text-gray-800">Note:</span>{' '}
                      <span className="break-words">{transaction.note}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Right - Actions */}
              {showActions && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(transaction.id);
                  }}
                  className="text-red-600 hover:bg-red-50 hover:border-red-300 flex-shrink-0"
                >
                  Delete
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
