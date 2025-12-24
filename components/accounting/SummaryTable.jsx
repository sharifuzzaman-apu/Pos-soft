'use client';

import Card from '@/components/ui/Card';

function formatNumber(value) {
  return (value || 0).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default function SummaryTable({ summaries = {}, className = '' }) {
  const dates = Object.keys(summaries).sort(
    (a, b) => new Date(a) - new Date(b)
  );

  if (dates.length === 0) {
    return (
      <Card className={className}>
        <p className="text-sm text-gray-600">No summary data available.</p>
      </Card>
    );
  }

  return (
    <Card className={`overflow-x-auto ${className}`}>
      <table className="min-w-full border border-gray-200 text-sm">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="border border-gray-200 px-3 py-2 text-left">Date</th>
            <th className="border border-gray-200 px-3 py-2 text-right">
              bKash Received
            </th>
            <th className="border border-gray-200 px-3 py-2 text-right">
              Cash Received
            </th>
            <th className="border border-gray-200 px-3 py-2 text-right">
              Total Income
            </th>
            <th className="border border-gray-200 px-3 py-2 text-right">
              Total Expense
            </th>
            <th className="border border-gray-200 px-3 py-2 text-right">
              Bank Balance
            </th>
            <th className="border border-gray-200 px-3 py-2 text-right">
              Cash Balance
            </th>
            <th className="border border-gray-200 px-3 py-2 text-right">
              Net Balance
            </th>
            <th className="border border-gray-200 px-3 py-2 text-right">
              bKash Charge
            </th>
          </tr>
        </thead>
        <tbody>
          {dates.map((date) => {
            const summary = summaries[date];
            const income = summary?.income || {};
            const balance = summary?.balance || {};
            const totalIncome =
              (income.totalBkashReceived || 0) + (income.totalCash || 0);
            const netBalance = balance.total || 0;

            return (
              <tr
                key={date}
                className="odd:bg-white even:bg-gray-50 text-gray-900"
              >
                <td className="border border-gray-200 px-3 py-2 text-left align-top">
                  {date}
                </td>
                <td className="border border-gray-200 px-3 py-2 text-right align-top">
                  ৳{formatNumber(income.totalBkashReceived)}
                </td>
                <td className="border border-gray-200 px-3 py-2 text-right align-top">
                  ৳{formatNumber(income.totalCash)}
                </td>
                <td className="border border-gray-200 px-3 py-2 text-right align-top">
                  ৳{formatNumber(totalIncome)}
                </td>
                <td className="border border-gray-200 px-3 py-2 text-right align-top">
                  ৳{formatNumber(summary.totalExpense)}
                </td>
                <td className="border border-gray-200 px-3 py-2 text-right align-top">
                  ৳{formatNumber(balance.bank)}
                </td>
                <td className="border border-gray-200 px-3 py-2 text-right align-top">
                  ৳{formatNumber(balance.cash)}
                </td>
                <td className="border border-gray-200 px-3 py-2 text-right align-top">
                  ৳{formatNumber(netBalance)}
                </td>
                <td className="border border-gray-200 px-3 py-2 text-right align-top">
                  ৳{formatNumber(income.totalBkashCharge)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
}
