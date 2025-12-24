'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addExpense } from '@/lib/redux/features/expense/expenseSlice';
import { calculateDailySummary } from '@/lib/redux/features/summary/summarySlice';
import toast from 'react-hot-toast';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Textarea from '@/components/ui/Textarea';
import DatePicker from '@/components/ui/DatePicker';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

export default function ExpenseForm() {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.expense);
  const { transactions: bkashTransactions } = useSelector(
    (state) => state.bkash
  );
  const { transactions: cashTransactions } = useSelector((state) => state.cash);
  const { expenses } = useSelector((state) => state.expense);

  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    paymentMethod: 'cash',
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

    if (!formData.category) {
      toast.error('অনুগ্রহ করে খরচের ধরন নির্বাচন করুন');
      return;
    }

    dispatch(
      addExpense({
        amount: parseFloat(formData.amount),
        category: formData.category,
        paymentMethod: formData.paymentMethod,
        date: formData.date,
        note: formData.note,
      })
    );

    dispatch(
      calculateDailySummary({
        bkashTransactions,
        cashTransactions,
        expenses: [
          ...expenses,
          {
            amount: parseFloat(formData.amount),
            category: formData.category,
            paymentMethod: formData.paymentMethod,
            date: formData.date,
          },
        ],
      })
    );

    toast.success('✅ খরচ যোগ করা হয়েছে!');

    setFormData({
      amount: '',
      category: '',
      paymentMethod: 'cash',
      date: new Date().toISOString().split('T')[0],
      note: '',
    });
  };

  return (
    <Card title="Add Expense" subtitle="দৈনিক খরচের হিসাব যোগ করুন">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Category Select */}
        <Select
          name="category"
          label="Expense Category"
          value={formData.category}
          onChange={handleChange}
          options={categories}
          placeholder="Select expense category"
          required
        />

        {/* Amount Input */}
        <Input
          type="number"
          name="amount"
          label="Amount (৳)"
          value={formData.amount}
          onChange={handleChange}
          placeholder="500"
          required
          min="0"
          step="0.01"
        />

        {/* Payment Method Radio */}
        <div>
          <label className="label">
            Payment Method <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer px-4 py-3 rounded-lg border-2 transition-all hover:bg-gray-50 flex-1">
              <input
                type="radio"
                name="paymentMethod"
                value="cash"
                checked={formData.paymentMethod === 'cash'}
                onChange={handleChange}
                className="w-4 h-4 text-purple-600"
              />
              <span className="text-xl">💵</span>
              <span className="text-sm font-medium text-gray-700 flex-1">
                Cash
              </span>
              {formData.paymentMethod === 'cash' && (
                <Badge variant="success" size="sm">
                  Selected
                </Badge>
              )}
            </label>

            <label className="flex items-center gap-2 cursor-pointer px-4 py-3 rounded-lg border-2 transition-all hover:bg-gray-50 flex-1">
              <input
                type="radio"
                name="paymentMethod"
                value="bank"
                checked={formData.paymentMethod === 'bank'}
                onChange={handleChange}
                className="w-4 h-4 text-purple-600"
              />
              <span className="text-xl">🏦</span>
              <span className="text-sm font-medium text-gray-700 flex-1">
                Bank
              </span>
              {formData.paymentMethod === 'bank' && (
                <Badge variant="success" size="sm">
                  Selected
                </Badge>
              )}
            </label>
          </div>
        </div>

        {/* Date Input */}
        <DatePicker
          name="date"
          label="Expense Date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        {/* Note Input */}
        <Textarea
          name="note"
          label="Note (Optional)"
          value={formData.note}
          onChange={handleChange}
          placeholder="Add additional details about this expense..."
          rows={3}
        />

        {/* Expense Preview */}
        {formData.amount &&
          parseFloat(formData.amount) > 0 &&
          formData.category && (
            <div className="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200 rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">📊</span>
                <h4 className="text-sm font-semibold text-gray-700">
                  Expense Summary
                </h4>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Category:</span>
                  <Badge variant="purple">{formData.category}</Badge>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-semibold text-red-600 text-lg">
                    -৳
                    {parseFloat(formData.amount).toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Payment: </span>
                  <Badge
                    variant={
                      formData.paymentMethod === 'cash' ? 'success' : 'info'
                    }
                  >
                    {formData.paymentMethod === 'cash' ? '💵 Cash' : '🏦 Bank'}
                  </Badge>
                </div>
              </div>
            </div>
          )}

        {/* Submit Button */}
        <Button type="submit" variant="danger" className="w-full">
          💾 Add Expense
        </Button>
      </form>
    </Card>
  );
}
