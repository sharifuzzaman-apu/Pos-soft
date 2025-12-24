'use client';

import { useSelector } from 'react-redux';
import Header from '@/components/layout/Header';
import SummaryTable from '@/components/accounting/SummaryTable';

export default function SummaryPage() {
  const { dailySummaries } = useSelector((state) => state.summary);

  return (
    <div className="space-y-6">
      {/* Header */}
      <Header
        title="Financial Summary"
        subtitle="Date-wise financial reports"
      />

      {/* Summary Table */}
      <SummaryTable summaries={dailySummaries} />
    </div>
  );
}
