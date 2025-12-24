'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCashTransaction } from '@/lib/redux/features/cash/cashSlice';
import { calculateDailySummary } from '@/lib/redux/features/summary/summarySlice';
import toast from 'react-hot-toast';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import DatePicker from '@/components/ui/DatePicker';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

export default function CashForm() {
  const dispatch = useDispatch();
  const { transactions: bkashTransactions } = useSelector(
    (state) => state.bkash
  );
  const { transactions: cashTransactions } = useSelector((state) => state.cash);
  const { expenses } = useSelector((state) => state.expense);

  const [formData, setFormData] = useState({
    amount: '',
    date: new Date().toISOString().split('T')[0],
    note: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      toast.error('অনুগ্রহ করে সঠিক পরিমাণ লিখুন');
      return;
    }

    dispatch(
      addCashTransaction({
        amount: parseFloat(formData.amount),
        date: formData.date,
        note: formData.note,
      })
    );

    dispatch(
      calculateDailySummary({
        bkashTransactions,
        cashTransactions: [
          ...cashTransactions,
          {
            amount: parseFloat(formData.amount),
            date: formData.date,
          },
        ],
        expenses,
      })
    );

    toast.success('✅ Cash লেনদেন যোগ করা হয়েছে!');

    setFormData({
      amount: '',
      date: new Date().toISOString().split('T')[0],
      note: '',
    });
  };

  return (
    <Card title="Add Cash Transaction" subtitle="নগদ টাকার হিসাব যোগ করুন">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Amount Input */}
        <Input
          type="number"
          name="amount"
          label="Cash Amount (৳)"
          value={formData.amount}
          onChange={handleChange}
          placeholder="5000"
          required
          min="0"
          step="0.01"
        />

        {/* Date Input */}
        <DatePicker
          name="date"
          label="Transaction Date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        {/* Note Input */}
        <Input
          type="text"
          name="note"
          label="Note (Optional)"
          value={formData.note}
          onChange={handleChange}
          placeholder="e.g., Daily sales, Cash payment"
        />

        {/* Amount Preview */}
        {formData.amount && parseFloat(formData.amount) > 0 && (
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">💰</span>
              <h4 className="text-sm font-semibold text-gray-700">
                Amount Summary
              </h4>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Cash to be added:</span>
              <div className="flex items-center gap-2">
                <Badge variant="success" size="sm">
                  Cash
                </Badge>
                <span className="text-2xl font-bold text-green-600">
                  ৳
                  {parseFloat(formData.amount).toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <Button type="submit" variant="success" className="w-full">
          💾 Add Cash
        </Button>
      </form>
    </Card>
  );
}
