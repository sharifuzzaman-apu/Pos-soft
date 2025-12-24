'use client';

import { useSelector } from 'react-redux';
import { useState } from 'react';
import Header from '@/components/layout/Header';
import Card from '@/components/ui/Card';
import Tabs from '@/components/ui/Tabs';
import TransactionList from '@/components/accounting/TransactionList';
import Empty from '@/components/ui/Empty';

export default function HistoryPage() {
  const { transactions: bkashTransactions } = useSelector(
    (state) => state.bkash
  );
  const { transactions: cashTransactions } = useSelector((state) => state.cash);
  const { expenses } = useSelector((state) => state.expense);
  const { loans } = useSelector((state) => state.loan);

  // Combine all for "All" tab
  const allTransactions = [
    ...bkashTransactions.map((t) => ({ ...t, type: 'bkash' })),
    ...cashTransactions.map((t) => ({ ...t, type: 'cash' })),
    ...expenses.map((e) => ({ ...e, type: 'expense' })),
  ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const tabs = [
    {
      label: `All (${allTransactions.length})`,
      content:
        allTransactions.length > 0 ? (
          <TransactionList transactions={allTransactions} showActions={false} />
        ) : (
          <Card>
            <Empty
              icon="📭"
              title="No Transactions"
              message="No transactions found"
            />
          </Card>
        ),
    },
    {
      label: `bKash (${bkashTransactions.length})`,
      content:
        bkashTransactions.length > 0 ? (
          <TransactionList
            transactions={bkashTransactions}
            type="bkash"
            showActions={false}
          />
        ) : (
          <Card>
            <Empty
              icon="📱"
              title="No bKash Transactions"
              message="No bKash transactions found"
            />
          </Card>
        ),
    },
    {
      label: `Cash (${cashTransactions.length})`,
      content:
        cashTransactions.length > 0 ? (
          <TransactionList
            transactions={cashTransactions}
            type="cash"
            showActions={false}
          />
        ) : (
          <Card>
            <Empty
              icon="💵"
              title="No Cash Transactions"
              message="No cash transactions found"
            />
          </Card>
        ),
    },
    {
      label: `Expenses (${expenses.length})`,
      content:
        expenses.length > 0 ? (
          <TransactionList
            transactions={expenses}
            type="expense"
            showActions={false}
          />
        ) : (
          <Card>
            <Empty icon="🛒" title="No Expenses" message="No expenses found" />
          </Card>
        ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <Header
        title="Transaction History"
        subtitle="View all your transactions"
      />

      {/* Tabs */}
      <Tabs tabs={tabs} />
    </div>
  );
}
