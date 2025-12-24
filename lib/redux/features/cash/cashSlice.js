import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  transactions: [],
  totalCash: 0,
};

// Load from localStorage
if (typeof window !== 'undefined') {
  const saved = localStorage.getItem('cash');
  if (saved) {
    Object.assign(initialState, JSON.parse(saved));
  }
}

const cashSlice = createSlice({
  name: 'cash',
  initialState,
  reducers: {
    addCashTransaction: (state, action) => {
      const { amount, date, note } = action.payload;

      const transaction = {
        id: Date.now().toString(),
        amount,
        date,
        note,
        createdAt: new Date().toISOString(),
      };

      state.transactions.push(transaction);
      state.totalCash += amount;

      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('cash', JSON.stringify(state));
      }
    },

    deleteCashTransaction: (state, action) => {
      const transaction = state.transactions.find(
        (t) => t.id === action.payload
      );
      if (transaction) {
        state.totalCash -= transaction.amount;
        state.transactions = state.transactions.filter(
          (t) => t.id !== action.payload
        );

        // Save to localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('cash', JSON.stringify(state));
        }
      }
    },

    clearCashTransactions: (state) => {
      state.transactions = [];
      state.totalCash = 0;

      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('cash', JSON.stringify(state));
      }
    },
  },
});

export const {
  addCashTransaction,
  deleteCashTransaction,
  clearCashTransactions,
} = cashSlice.actions;

export default cashSlice.reducer;
