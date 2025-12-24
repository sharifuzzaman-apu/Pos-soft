import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  dailySummaries: {},
  monthlySummaries: {},
  yearlySummaries: {},
};

// Load from localStorage
if (typeof window !== 'undefined') {
  const saved = localStorage.getItem('summary');
  if (saved) {
    Object.assign(initialState, JSON.parse(saved));
  }
}

const summarySlice = createSlice({
  name: 'summary',
  initialState,
  reducers: {
    calculateDailySummary: (state, action) => {
      const { bkashTransactions, cashTransactions, expenses } = action.payload;

      // Group by date
      const summaryByDate = {};

      // Process bKash transactions
      bkashTransactions.forEach((transaction) => {
        const date = transaction.date;
        if (!summaryByDate[date]) {
          summaryByDate[date] = {
            income: {
              totalBkashReceived: 0,
              totalBankAmount: 0,
              totalBkashCharge: 0,
              totalCash: 0,
            },
            totalExpense: 0,
            expenseByMethod: { cash: 0, bank: 0 },
            expenseByCategory: {},
            balance: {
              bank: 0,
              cash: 0,
              total: 0,
            },
          };
        }

        summaryByDate[date].income.totalBkashReceived += transaction.amount;
        summaryByDate[date].income.totalBankAmount += transaction.bankAmount;
        summaryByDate[date].income.totalBkashCharge += transaction.charge;
      });

      // Process cash transactions
      cashTransactions.forEach((transaction) => {
        const date = transaction.date;
        if (!summaryByDate[date]) {
          summaryByDate[date] = {
            income: {
              totalBkashReceived: 0,
              totalBankAmount: 0,
              totalBkashCharge: 0,
              totalCash: 0,
            },
            totalExpense: 0,
            expenseByMethod: { cash: 0, bank: 0 },
            expenseByCategory: {},
            balance: {
              bank: 0,
              cash: 0,
              total: 0,
            },
          };
        }

        summaryByDate[date].income.totalCash += transaction.amount;
      });

      // Process expenses
      expenses.forEach((expense) => {
        const date = expense.date;
        if (!summaryByDate[date]) {
          summaryByDate[date] = {
            income: {
              totalBkashReceived: 0,
              totalBankAmount: 0,
              totalBkashCharge: 0,
              totalCash: 0,
            },
            totalExpense: 0,
            expenseByMethod: { cash: 0, bank: 0 },
            expenseByCategory: {},
            balance: {
              bank: 0,
              cash: 0,
              total: 0,
            },
          };
        }

        summaryByDate[date].totalExpense += expense.amount;
        summaryByDate[date].expenseByMethod[expense.paymentMethod] +=
          expense.amount;

        if (!summaryByDate[date].expenseByCategory[expense.category]) {
          summaryByDate[date].expenseByCategory[expense.category] = 0;
        }
        summaryByDate[date].expenseByCategory[expense.category] +=
          expense.amount;
      });

      // Calculate balances
      Object.keys(summaryByDate).forEach((date) => {
        const summary = summaryByDate[date];

        summary.balance.bank =
          summary.income.totalBankAmount - summary.expenseByMethod.bank;

        summary.balance.cash =
          summary.income.totalCash - summary.expenseByMethod.cash;

        summary.balance.total = summary.balance.bank + summary.balance.cash;
      });

      state.dailySummaries = summaryByDate;

      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('summary', JSON.stringify(state));
      }
    },

    clearSummaries: (state) => {
      state.dailySummaries = {};
      state.monthlySummaries = {};
      state.yearlySummaries = {};

      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('summary', JSON.stringify(state));
      }
    },
  },
});

export const { calculateDailySummary, clearSummaries } = summarySlice.actions;

export default summarySlice.reducer;
