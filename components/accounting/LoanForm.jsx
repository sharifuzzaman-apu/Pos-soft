'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addLoan } from '@/lib/redux/features/loan/loanSlice';
import { addCashTransaction } from '@/lib/redux/features/cash/cashSlice';
import toast from 'react-hot-toast';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Textarea from '@/components/ui/Textarea';
import DatePicker from '@/components/ui/DatePicker';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

const statusOptions = ['Active', 'Paid', 'Partial'];

export default function LoanForm() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    personName: '',
    amount: '',
    interestRate: '',
    date: new Date().toISOString().split('T')[0],
    dueDate: '',
    status: 'Active',
    paidAmount: '',
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

    if (!formData.personName.trim()) {
      toast.error('অনুগ্রহ করে ব্যক্তির নাম লিখুন');
      return;
    }

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      toast.error('অনুগ্রহ করে সঠিক পরিমাণ লিখুন');
      return;
    }

    const amount = parseFloat(formData.amount);

    // Add loan
    dispatch(
      addLoan({
        personName: formData.personName,
        amount,
        interestRate: parseFloat(formData.interestRate) || 0,
        date: formData.date,
        dueDate: formData.dueDate || null,
        status: formData.status,
        paidAmount: parseFloat(formData.paidAmount) || 0,
        note: formData.note,
      })
    );

    // ✅ Automatically add loan amount to cash
    dispatch(
      addCashTransaction({
        amount,
        date: formData.date,
        note: `Loan taken from ${formData.personName}`,
      })
    );

    toast.success('✅ ঋণ যোগ করা হয়েছে এবং Cash এ add হয়েছে!');

    setFormData({
      personName: '',
      amount: '',
      interestRate: '',
      date: new Date().toISOString().split('T')[0],
      dueDate: '',
      status: 'Active',
      paidAmount: '',
      note: '',
    });
  };

  // Calculations
  const amount = parseFloat(formData.amount) || 0;
  const interestRate = parseFloat(formData.interestRate) || 0;
  const paidAmount = parseFloat(formData.paidAmount) || 0;
  const interestAmount = (amount * interestRate) / 100;
  const totalAmount = amount + interestAmount;
  const remainingAmount = totalAmount - paidAmount;

  return (
    <Card
      title="Take Loan"
      subtitle="ঋণ গ্রহণের হিসাব যোগ করুন (Cash এ automatically add হবে)"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Person Name */}
        <Input
          type="text"
          name="personName"
          label="Lender Name (যার কাছ থেকে নিচ্ছেন)"
          value={formData.personName}
          onChange={handleChange}
          placeholder="Enter lender's name"
          required
        />

        {/* Amount & Interest Rate */}
        <div className="grid grid-cols-2 gap-4">
          <Input
            type="number"
            name="amount"
            label="Loan Amount (৳)"
            value={formData.amount}
            onChange={handleChange}
            placeholder="10000"
            required
            min="0"
            step="0.01"
          />

          <Input
            type="number"
            name="interestRate"
            label="Interest Rate (%)"
            value={formData.interestRate}
            onChange={handleChange}
            placeholder="0"
            min="0"
            step="0.01"
          />
        </div>

        {/* Date & Due Date */}
        <div className="grid grid-cols-2 gap-4">
          <DatePicker
            name="date"
            label="Loan Date"
            value={formData.date}
            onChange={handleChange}
            required
          />

          <DatePicker
            name="dueDate"
            label="Due Date (Optional)"
            value={formData.dueDate}
            onChange={handleChange}
            min={formData.date}
          />
        </div>

        {/* Status & Paid Amount */}
        <div className="grid grid-cols-2 gap-4">
          <Select
            name="status"
            label="Status"
            value={formData.status}
            onChange={handleChange}
            options={statusOptions}
            required
          />

          <Input
            type="number"
            name="paidAmount"
            label="Paid Amount (৳)"
            value={formData.paidAmount}
            onChange={handleChange}
            placeholder="0"
            min="0"
            step="0.01"
          />
        </div>

        {/* Note */}
        <Textarea
          name="note"
          label="Note (Optional)"
          value={formData.note}
          onChange={handleChange}
          placeholder="Add additional details about this loan..."
          rows={2}
        />

        {/* Loan Summary */}
        {formData.amount && parseFloat(formData.amount) > 0 && (
          <div className="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200 rounded-lg p-4 space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">📊</span>
              <h4 className="text-sm font-semibold text-gray-700">
                Loan Summary
              </h4>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Principal Amount:</span>
                <span className="font-semibold text-gray-900">
                  ৳
                  {amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>

              {interestRate > 0 && (
                <>
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Interest ({interestRate}%):
                    </span>
                    <span className="font-semibold text-orange-600">
                      +৳
                      {interestAmount.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Amount to Pay:</span>
                    <span className="font-semibold text-red-600">
                      ৳
                      {totalAmount.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                </>
              )}

              {paidAmount > 0 && (
                <>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Already Paid:</span>
                    <span className="font-semibold text-green-600">
                      -৳
                      {paidAmount.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                  <div className="border-t-2 border-gray-300 pt-2">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-700">
                        Remaining:
                      </span>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            remainingAmount === 0 ? 'success' : 'warning'
                          }
                        >
                          {remainingAmount === 0 ? 'Fully Paid' : 'Pending'}
                        </Badge>
                        <span className="font-bold text-lg text-red-600">
                          ৳
                          {remainingAmount.toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Cash Info */}
              <div className="bg-green-100 border border-green-300 rounded p-2 mt-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">💵</span>
                  <span className="text-xs text-green-700 font-medium">
                    ৳{amount.toLocaleString('en-US')} will be added to Cash
                    automatically
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <Button type="submit" variant="danger" className="w-full">
          💾 Take Loan & Add to Cash
        </Button>
      </form>
    </Card>
  );
}
