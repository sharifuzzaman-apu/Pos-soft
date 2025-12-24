'use client';

import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { useState } from 'react';
import { format } from 'date-fns';

export default function DailySummaryCard({ date, summary, className = '' }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const netBalance = summary.balance?.total || 0;
  const isProfit = netBalance >= 0;

  return (
    <Card className={className}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">📅</span>
          <div>
            <p className="font-semibold text-gray-900">
              {format(new Date(date), 'dd MMMM yyyy')}
            </p>
            <p className="text-xs text-gray-600">
              {format(new Date(date), 'EEEE')}
            </p>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? 'Hide Details' : 'View Details'}
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        {/* Total Income */}
        <div className="bg-green-50 rounded-lg p-3 border border-green-200">
          <p className="text-xs text-gray-600 mb-1">Income</p>
          <p className="text-lg font-bold text-green-600">
            ৳
            {(
              (summary.income?.totalBankAmount || 0) +
              (summary.income?.totalCash || 0)
            ).toLocaleString('en-US')}
          </p>
        </div>

        {/* Total Expense */}
        <div className="bg-red-50 rounded-lg p-3 border border-red-200">
          <p className="text-xs text-gray-600 mb-1">Expense</p>
          <p className="text-lg font-bold text-red-600">
            ৳{(summary.totalExpense || 0).toLocaleString('en-US')}
          </p>
        </div>

        {/* Bank Balance */}
        <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
          <p className="text-xs text-gray-600 mb-1">Bank</p>
          <p className="text-lg font-bold text-blue-600">
            ৳{(summary.balance?.bank || 0).toLocaleString('en-US')}
          </p>
        </div>

        {/* Cash Balance */}
        <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
          <p className="text-xs text-gray-600 mb-1">Cash</p>
          <p className="text-lg font-bold text-purple-600">
            ৳{(summary.balance?.cash || 0).toLocaleString('en-US')}
          </p>
        </div>
      </div>

      {/* Net Balance */}
      <div
        className={`p-4 rounded-lg ${
          isProfit ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
        } border-2`}
      >
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Net Balance</span>
          <Badge variant={isProfit ? 'success' : 'danger'}>
            {isProfit ? 'Profit' : 'Loss'}
          </Badge>
        </div>
        <p
          className={`text-3xl font-bold mt-1 ${
            isProfit ? 'text-green-600' : 'text-red-600'
          }`}
        >
          ৳{Math.abs(netBalance).toLocaleString('en-US')}
        </p>
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-gray-200 space-y-3">
          {/* Income Details */}
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-2">
              Income Details:{' '}
            </p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">bKash Received: </span>
                <span className="font-medium">
                  ৳
                  {(summary.income?.totalBkashReceived || 0).toLocaleString(
                    'en-US'
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Cash Received:</span>
                <span className="font-medium">
                  ৳{(summary.income?.totalCash || 0).toLocaleString('en-US')}
                </span>
              </div>
            </div>
          </div>

          {/* Expense Details */}
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-2">
              Expense Details:
            </p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Cash Expense:</span>
                <span className="font-medium text-red-600">
                  ৳
                  {(summary.expenseByMethod?.cash || 0).toLocaleString('en-US')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Bank Expense: </span>
                <span className="font-medium text-red-600">
                  ৳
                  {(summary.expenseByMethod?.bank || 0).toLocaleString('en-US')}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
