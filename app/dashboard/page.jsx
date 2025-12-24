'use client';

import { useSelector } from 'react-redux';
import Header from '@/components/layout/Header';
import StatsCard from '@/components/accounting/StatsCard';
import BalanceCard from '@/components/accounting/BalanceCard';
import RecentTransactions from '@/components/accounting/RecentTransactions';

export default function DashboardPage() {
  // Get data from Redux
  const {
    totalBankAmount,
    totalReceived,
    totalCharge,
    transactions: bkashTransactions,
  } = useSelector((state) => state.bkash);
  const { totalCash, transactions: cashTransactions } = useSelector(
    (state) => state.cash
  );
  const { totalExpense, expenses } = useSelector((state) => state.expense);
  const {
    totalLoanGiven,
    totalLoanTaken,
    totalLoanGivenRemaining,
    totalLoanTakenRemaining,
  } = useSelector((state) => state.loan);

  // Calculate totals
  const totalBalance = totalBankAmount + totalCash;
  const totalIncome = totalReceived + totalCash;
  const netProfit = totalIncome - totalExpense;

  // Combine all transactions for recent list
  const allTransactions = [
    ...bkashTransactions.map((t) => ({ ...t, type: 'bkash' })),
    ...cashTransactions.map((t) => ({ ...t, type: 'cash' })),
    ...expenses.map((e) => ({ ...e, type: 'expense' })),
  ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className="space-y-6">
      {/* Header */}
      <Header title="Dashboard" subtitle="Overview of your financial status" />

      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <BalanceCard
          title="Total Balance"
          amount={totalBalance}
          subtitle="Bank + Cash"
          variant="purple"
          showBadge={true}
          badgeText="Current"
        />

        <BalanceCard
          title="Bank Balance"
          amount={totalBankAmount}
          subtitle="From bKash transactions"
          variant="blue"
        />

        <BalanceCard
          title="Cash Balance"
          amount={totalCash}
          subtitle="Available cash"
          variant="green"
        />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Income"
          value={`৳${totalIncome.toLocaleString('en-US')}`}
          valueColor="text-green-600"
          badgeText="Received"
          badgeVariant="success"
        />

        <StatsCard
          title="Total Expense"
          value={`৳${totalExpense.toLocaleString('en-US')}`}
          valueColor="text-red-600"
          badgeText="Spent"
          badgeVariant="danger"
        />

        <StatsCard
          title="Net Profit"
          value={`৳${netProfit.toLocaleString('en-US')}`}
          valueColor={netProfit >= 0 ? 'text-blue-600' : 'text-orange-600'}
          badgeText={netProfit >= 0 ? 'Profit' : 'Loss'}
          badgeVariant={netProfit >= 0 ? 'info' : 'warning'}
        />

        <StatsCard
          title="bKash Charge"
          value={`৳${totalCharge.toLocaleString('en-US')}`}
          valueColor="text-pink-600"
          badgeText="Deducted"
          badgeVariant="warning"
        />
      </div>

      {/* Loan Summary */}
      {(totalLoanGiven > 0 || totalLoanTaken > 0) && (
        <div className="grid grid-cols-1 md: grid-cols-2 gap-6">
          <StatsCard
            title="Loan Given (Remaining)"
            value={`৳${totalLoanGivenRemaining.toLocaleString('en-US')}`}
            valueColor="text-teal-600"
            badgeText={`Total:  ৳${totalLoanGiven.toLocaleString('en-US')}`}
            badgeVariant="info"
          />

          <StatsCard
            title="Loan Taken (Remaining)"
            value={`৳${totalLoanTakenRemaining.toLocaleString('en-US')}`}
            valueColor="text-orange-600"
            badgeText={`Total: ৳${totalLoanTaken.toLocaleString('en-US')}`}
            badgeVariant="warning"
          />
        </div>
      )}

      {/* Recent Transactions */}
      <RecentTransactions
        transactions={allTransactions}
        limit={10}
        showViewAll={true}
      />
    </div>
  );
}
