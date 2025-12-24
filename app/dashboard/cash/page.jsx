'use client';

import { useSelector, useDispatch } from 'react-redux';
import Header from '@/components/layout/Header';
import CashForm from '@/components/accounting/CashForm';
import TransactionList from '@/components/accounting/TransactionList';
import StatsCard from '@/components/accounting/StatsCard';
import { deleteCashTransaction } from '@/lib/redux/features/cash/cashSlice';

export default function CashPage() {
  const dispatch = useDispatch();
  const { transactions, totalCash } = useSelector((state) => state.cash);

  const handleDelete = (id) => {
    dispatch(deleteCashTransaction(id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Header
        title="Cash Transactions"
        subtitle="Manage your cash income transactions"
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatsCard
          title="Total Cash"
          value={`৳${totalCash.toLocaleString('en-US')}`}
          valueColor="text-green-600"
          badgeText={`${transactions.length} transactions`}
          badgeVariant="success"
        />

        <StatsCard
          title="Average Transaction"
          value={`৳${
            transactions.length > 0
              ? (totalCash / transactions.length).toLocaleString('en-US', {
                  maximumFractionDigits: 2,
                })
              : '0'
          }`}
          valueColor="text-blue-600"
          badgeText="Per transaction"
          badgeVariant="info"
        />
      </div>

      {/* Form & List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CashForm />
        <TransactionList
          transactions={transactions}
          type="cash"
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
