'use client';

import { useSelector, useDispatch } from 'react-redux';
import Header from '@/components/layout/Header';
import BkashForm from '@/components/accounting/BkashForm';
import TransactionList from '@/components/accounting/TransactionList';
import StatsCard from '@/components/accounting/StatsCard';
import { deleteBkashTransaction } from '@/lib/redux/features/bkash/bkashSlice';

export default function BkashPage() {
  const dispatch = useDispatch();
  const { transactions, totalBankAmount, totalReceived, totalCharge } =
    useSelector((state) => state.bkash);

  const handleDelete = (id) => {
    dispatch(deleteBkashTransaction(id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Header
        title="bKash Transactions"
        subtitle="Manage your bKash income transactions"
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md: grid-cols-3 gap-6">
        <StatsCard
          title="Total Received"
          value={`৳${totalReceived.toLocaleString('en-US')}`}
          valueColor="text-pink-600"
          badgeText={`${transactions.length} transactions`}
          badgeVariant="info"
        />

        <StatsCard
          title="Bank Amount"
          value={`৳${totalBankAmount.toLocaleString('en-US')}`}
          valueColor="text-blue-600"
          badgeText="After charge"
          badgeVariant="success"
        />

        <StatsCard
          title="Total Charge"
          value={`৳${totalCharge.toLocaleString('en-US')}`}
          valueColor="text-red-600"
          badgeText="Deducted"
          badgeVariant="danger"
        />
      </div>

      {/* Form & List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BkashForm />
        <TransactionList
          transactions={transactions}
          type="bkash"
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
