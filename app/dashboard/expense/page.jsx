'use client';

import { useSelector, useDispatch } from 'react-redux';
import Header from '@/components/layout/Header';
import ExpenseForm from '@/components/accounting/ExpenseForm';
import TransactionList from '@/components/accounting/TransactionList';
import StatsCard from '@/components/accounting/StatsCard';
import { deleteExpense } from '@/lib/redux/features/expense/expenseSlice';

export default function ExpensePage() {
  const dispatch = useDispatch();
  const { expenses, totalExpense, expenseByMethod } = useSelector(
    (state) => state.expense
  );

  const handleDelete = (id) => {
    dispatch(deleteExpense(id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Header title="Expense Management" subtitle="Track your daily expenses" />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Total Expense"
          value={`৳${totalExpense.toLocaleString('en-US')}`}
          valueColor="text-red-600"
          badgeText={`${expenses.length} expenses`}
          badgeVariant="danger"
        />

        <StatsCard
          title="Cash Expense"
          value={`৳${expenseByMethod.cash.toLocaleString('en-US')}`}
          valueColor="text-orange-600"
          badgeText="Cash paid"
          badgeVariant="warning"
        />

        <StatsCard
          title="Bank Expense"
          value={`৳${expenseByMethod.bank.toLocaleString('en-US')}`}
          valueColor="text-purple-600"
          badgeText="Bank paid"
          badgeVariant="info"
        />
      </div>

      {/* Form & List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ExpenseForm />
        <TransactionList
          transactions={expenses}
          type="expense"
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
