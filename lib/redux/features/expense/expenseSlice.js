import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  expenses: [],
  totalExpense: 0,
  categories: [
    'Food & Groceries',
    'Transport',
    'Utilities',
    'Rent',
    'Salary',
    'Office Supplies',
    'Marketing',
    'Maintenance',
    'Entertainment',
    'Healthcare',
    'Education',
    'Other',
  ],
  expenseByCategory: {},
  expenseByMethod: {
    cash: 0,
    bank: 0,
  },
};

// Load from localStorage
if (typeof window !== 'undefined') {
  const saved = localStorage.getItem('expense');
  if (saved) {
    Object.assign(initialState, JSON.parse(saved));
  }
}

const expenseSlice = createSlice({
  name: 'expense',
  initialState,
  reducers: {
    addExpense: (state, action) => {
      const { amount, category, paymentMethod, date, note } = action.payload;

      const expense = {
        id: Date.now().toString(),
        amount,
        category,
        paymentMethod,
        date,
        note,
        createdAt: new Date().toISOString(),
      };

      state.expenses.push(expense);
      state.totalExpense += amount;

      // Update category totals
      if (!state.expenseByCategory[category]) {
        state.expenseByCategory[category] = 0;
      }
      state.expenseByCategory[category] += amount;

      // Update payment method totals
      state.expenseByMethod[paymentMethod] += amount;

      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('expense', JSON.stringify(state));
      }
    },

    deleteExpense: (state, action) => {
      const expense = state.expenses.find((e) => e.id === action.payload);
      if (expense) {
        state.totalExpense -= expense.amount;
        state.expenseByCategory[expense.category] -= expense.amount;
        state.expenseByMethod[expense.paymentMethod] -= expense.amount;
        state.expenses = state.expenses.filter((e) => e.id !== action.payload);

        // Save to localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('expense', JSON.stringify(state));
        }
      }
    },

    addCategory: (state, action) => {
      if (!state.categories.includes(action.payload)) {
        state.categories.push(action.payload);

        // Save to localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('expense', JSON.stringify(state));
        }
      }
    },

    clearExpenses: (state) => {
      state.expenses = [];
      state.totalExpense = 0;
      state.expenseByCategory = {};
      state.expenseByMethod = { cash: 0, bank: 0 };

      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('expense', JSON.stringify(state));
      }
    },
  },
});

export const { addExpense, deleteExpense, addCategory, clearExpenses } =
  expenseSlice.actions;

export default expenseSlice.reducer;
