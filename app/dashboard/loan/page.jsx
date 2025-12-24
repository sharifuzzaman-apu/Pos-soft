'use client';

import { useSelector, useDispatch } from 'react-redux';
import Header from '@/components/layout/Header';
import LoanForm from '@/components/accounting/LoanForm';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Empty from '@/components/ui/Empty';
import StatsCard from '@/components/accounting/StatsCard';
import { deleteLoan } from '@/lib/redux/features/loan/loanSlice';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

export default function LoanPage() {
  const dispatch = useDispatch();
  const { loans, totalLoanTaken, totalLoanTakenRemaining } = useSelector(
    (state) => state.loan
  );

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this loan?')) {
      dispatch(deleteLoan(id));
      toast.success('✅ Loan deleted successfully!');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Header title="Loan Management" subtitle="Track loans you have taken" />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatsCard
          title="Total Loan Taken"
          value={`৳${totalLoanTaken.toLocaleString('en-US')}`}
          valueColor="text-red-600"
          badgeText={`${loans.length} loan(s)`}
          badgeVariant="danger"
        />

        <StatsCard
          title="Remaining to Pay"
          value={`৳${totalLoanTakenRemaining.toLocaleString('en-US')}`}
          valueColor="text-orange-600"
          badgeText="Outstanding"
          badgeVariant="warning"
        />
      </div>

      {/* Form & List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form */}
        <LoanForm />

        {/* Loan List */}
        <Card
          title="Loans Taken"
          subtitle={`Total ${loans.length} loan(s) taken`}
        >
          {loans.length === 0 ? (
            <Empty
              icon="💰"
              title="No Loans"
              message="You haven't taken any loans yet"
            />
          ) : (
            <div className="space-y-3">
              {loans.map((loan) => (
                <div
                  key={loan.id}
                  className="p-4 border-2 border-red-200 rounded-lg bg-red-50 hover:border-red-300 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      {/* Header */}
                      <div className="flex items-center gap-2 mb-3">
                        <p className="font-semibold text-gray-900">
                          {loan.personName}
                        </p>
                        <Badge
                          variant={
                            loan.status === 'Paid'
                              ? 'success'
                              : loan.status === 'Partial'
                              ? 'warning'
                              : 'danger'
                          }
                        >
                          {loan.status}
                        </Badge>
                      </div>

                      {/* Details */}
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Loan Amount:</span>
                          <span className="font-semibold text-gray-900">
                            ৳{loan.amount.toLocaleString('en-US')}
                          </span>
                        </div>

                        {loan.interestRate > 0 && (
                          <>
                            <div className="flex justify-between">
                              <span className="text-gray-600">
                                Interest ({loan.interestRate}%):
                              </span>
                              <span className="font-semibold text-orange-600">
                                +৳{loan.interestAmount.toLocaleString('en-US')}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">
                                Total to Pay:
                              </span>
                              <span className="font-semibold text-red-600">
                                ৳{loan.totalAmount.toLocaleString('en-US')}
                              </span>
                            </div>
                          </>
                        )}

                        {loan.paidAmount > 0 && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Paid: </span>
                            <span className="font-semibold text-green-600">
                              ৳{loan.paidAmount.toLocaleString('en-US')}
                            </span>
                          </div>
                        )}

                        <div className="border-t border-red-300 pt-2">
                          <div className="flex justify-between">
                            <span className="font-semibold text-gray-700">
                              Remaining:
                            </span>
                            <span className="font-bold text-red-600">
                              ৳{loan.remainingAmount.toLocaleString('en-US')}
                            </span>
                          </div>
                        </div>

                        {/* Date */}
                        <div className="flex items-center gap-2 text-gray-500 pt-2">
                          <span>Date:</span>
                          <span>
                            {format(new Date(loan.date), 'dd MMM yyyy')}
                          </span>
                          {loan.dueDate && (
                            <>
                              <span className="text-gray-400">to</span>
                              <span className="text-orange-600 font-medium">
                                Due:{' '}
                                {format(new Date(loan.dueDate), 'dd MMM yyyy')}
                              </span>
                            </>
                          )}
                        </div>

                        {/* Note */}
                        {loan.note && (
                          <div className="text-xs text-gray-600 bg-white/50 p-2 rounded border border-red-200 mt-2">
                            📝 {loan.note}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Delete Button */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(loan.id)}
                      className="text-red-600 hover:bg-red-100 hover:border-red-300 flex-shrink-0"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
