'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBkashTransaction } from '@/lib/redux/features/bkash/bkashSlice';
import { calculateDailySummary } from '@/lib/redux/features/summary/summarySlice';
import toast from 'react-hot-toast';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import DatePicker from '@/components/ui/DatePicker';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

export default function BkashForm() {
  const dispatch = useDispatch();
  const { chargeRate } = useSelector((state) => state.bkash);
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

  // Real-time calculations
  const charge = formData.amount
    ? (parseFloat(formData.amount) * chargeRate) / 100
    : 0;
  const bankAmount = formData.amount ? parseFloat(formData.amount) - charge : 0;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    dispatch(
      addBkashTransaction({
        amount: parseFloat(formData.amount),
        date: formData.date,
        note: formData.note,
      })
    );

    dispatch(
      calculateDailySummary({
        bkashTransactions: [
          ...bkashTransactions,
          {
            amount: parseFloat(formData.amount),
            charge,
            bankAmount,
            date: formData.date,
          },
        ],
        cashTransactions,
        expenses,
      })
    );

    toast.success('✅ bKash transaction added');

    setFormData({
      amount: '',
      date: new Date().toISOString().split('T')[0],
      note: '',
    });
  };

  return (
    <Card
      title="Add bKash Transaction"
      subtitle="Add your bKash income records"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Amount Input */}
        <Input
          type="number"
          name="amount"
          label="Received Amount (৳)"
          value={formData.amount}
          onChange={handleChange}
          placeholder="10000"
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
          placeholder="e. g., Customer payment, Product sale"
        />

        {/* Calculation Preview */}
        {formData.amount && parseFloat(formData.amount) > 0 && (
          <div className="bg-gradient-to-br from-pink-50 to-purple-50 border-2 border-pink-200 rounded-lg p-4 space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">🧮</span>
              <h4 className="text-sm font-semibold text-gray-700">
                Calculation Preview
              </h4>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Received Amount:</span>
                <span className="font-semibold text-gray-900">
                  ৳
                  {parseFloat(formData.amount).toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>

              <div className="flex justify-between text-sm items-center">
                <span className="text-gray-600">
                  Bank Charge ({chargeRate}%):
                </span>
                <div className="flex items-center gap-2">
                  <Badge variant="danger" size="sm">
                    Deducted
                  </Badge>
                  <span className="font-semibold text-red-600">
                    -৳
                    {charge.toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
              </div>

              <div className="border-t-2 border-pink-300 pt-2 mt-2"></div>

              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-700">
                  Net Bank Amount:
                </span>
                <div className="flex items-center gap-2">
                  <Badge variant="success" size="sm">
                    Final
                  </Badge>
                  <span className="font-bold text-green-600 text-xl">
                    ৳
                    {bankAmount.toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <Button type="submit" variant="primary" className="w-full">
          💾 Add bKash Transaction
        </Button>
      </form>
    </Card>
  );
}
