import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  transactions: [],
  totalBankAmount: 0,
  totalReceived: 0,
  totalCharge: 0,
  chargeRate: 1.85, // Default bKash charge rate (1.85%)
};

// Load from localStorage
if (typeof window !== 'undefined') {
  const saved = localStorage.getItem('bkash');
  if (saved) {
    Object.assign(initialState, JSON.parse(saved));
  }
}

const bkashSlice = createSlice({
  name: 'bkash',
  initialState,
  reducers: {
    addBkashTransaction: (state, action) => {
      const { amount, date, note } = action.payload;
      const charge = (amount * state.chargeRate) / 100;
      const bankAmount = amount - charge;

      const transaction = {
        id: Date.now().toString(),
        amount,
        charge,
        bankAmount,
        date,
        note,
        createdAt: new Date().toISOString(),
      };

      state.transactions.push(transaction);
      state.totalReceived += amount;
      state.totalCharge += charge;
      state.totalBankAmount += bankAmount;

      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('bkash', JSON.stringify(state));
      }
    },

    deleteBkashTransaction: (state, action) => {
      const transaction = state.transactions.find(
        (t) => t.id === action.payload
      );
      if (transaction) {
        state.totalReceived -= transaction.amount;
        state.totalCharge -= transaction.charge;
        state.totalBankAmount -= transaction.bankAmount;
        state.transactions = state.transactions.filter(
          (t) => t.id !== action.payload
        );

        // Save to localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('bkash', JSON.stringify(state));
        }
      }
    },

    updateChargeRate: (state, action) => {
      state.chargeRate = action.payload;

      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('bkash', JSON.stringify(state));
      }
    },

    clearBkashTransactions: (state) => {
      state.transactions = [];
      state.totalBankAmount = 0;
      state.totalReceived = 0;
      state.totalCharge = 0;

      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('bkash', JSON.stringify(state));
      }
    },
  },
});

export const {
  addBkashTransaction,
  deleteBkashTransaction,
  updateChargeRate,
  clearBkashTransactions,
} = bkashSlice.actions;

export default bkashSlice.reducer;
