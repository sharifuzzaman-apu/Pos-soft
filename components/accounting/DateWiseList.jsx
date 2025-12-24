'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import Empty from '@/components/ui/Empty';
import DailySummaryCard from './DailySummaryCard';
import Input from '@/components/ui/Input';

export default function DateWiseList({ summaries = {}, className = '' }) {
  const [searchTerm, setSearchTerm] = useState('');

  const sortedDates = Object.keys(summaries).sort(
    (a, b) => new Date(b) - new Date(a)
  );

  const filteredDates = sortedDates.filter((date) => date.includes(searchTerm));

  if (sortedDates.length === 0) {
    return (
      <Card className={className}>
        <Empty
          icon="📅"
          title="No Summaries"
          message="No daily summaries available yet.  Start adding transactions!"
        />
      </Card>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Search */}
      <Card>
        <Input
          type="text"
          placeholder="Search by date (YYYY-MM-DD)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Card>

      {/* Summary List */}
      {filteredDates.length === 0 ? (
        <Card>
          <Empty
            icon="🔍"
            title="No Results"
            message="No summaries found for your search"
          />
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredDates.map((date) => (
            <DailySummaryCard
              key={date}
              date={date}
              summary={summaries[date]}
            />
          ))}
        </div>
      )}
    </div>
  );
}
