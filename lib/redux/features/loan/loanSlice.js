import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loans: [],
  totalLoanTaken: 0,
  totalLoanTakenRemaining: 0,
};

// Load from localStorage
if (typeof window !== 'undefined') {
  const saved = localStorage.getItem('loan');
  if (saved) {
    Object.assign(initialState, JSON.parse(saved));
  }
}

const loanSlice = createSlice({
  name: 'loan',
  initialState,
  reducers: {
    addLoan: (state, action) => {
      const {
        personName,
        amount,
        interestRate,
        date,
        dueDate,
        status,
        paidAmount,
        note,
      } = action.payload;

      const interestAmount = (amount * interestRate) / 100;
      const totalAmount = amount + interestAmount;
      const remainingAmount = totalAmount - paidAmount;

      const loan = {
        id: Date.now().toString(),
        personName,
        amount,
        interestRate,
        interestAmount,
        totalAmount,
        paidAmount,
        remainingAmount,
        date,
        dueDate,
        status,
        note,
        createdAt: new Date().toISOString(),
      };

      state.loans.push(loan);
      state.totalLoanTaken += totalAmount;
      state.totalLoanTakenRemaining += remainingAmount;

      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('loan', JSON.stringify(state));
      }
    },

    updateLoanPayment: (state, action) => {
      const { id, paidAmount } = action.payload;
      const loan = state.loans.find((l) => l.id === id);

      if (loan) {
        const oldRemaining = loan.remainingAmount;
        loan.paidAmount = paidAmount;
        loan.remainingAmount = loan.totalAmount - paidAmount;

        if (loan.remainingAmount === 0) {
          loan.status = 'Paid';
        } else if (loan.paidAmount > 0) {
          loan.status = 'Partial';
        }

        const difference = oldRemaining - loan.remainingAmount;
        state.totalLoanTakenRemaining -= difference;

        // Save to localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('loan', JSON.stringify(state));
        }
      }
    },

    deleteLoan: (state, action) => {
      const loan = state.loans.find((l) => l.id === action.payload);
      if (loan) {
        state.totalLoanTaken -= loan.totalAmount;
        state.totalLoanTakenRemaining -= loan.remainingAmount;
        state.loans = state.loans.filter((l) => l.id !== action.payload);

        // Save to localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('loan', JSON.stringify(state));
        }
      }
    },

    clearLoans: (state) => {
      state.loans = [];
      state.totalLoanTaken = 0;
      state.totalLoanTakenRemaining = 0;

      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('loan', JSON.stringify(state));
      }
    },
  },
});

export const { addLoan, updateLoanPayment, deleteLoan, clearLoans } =
  loanSlice.actions;

export default loanSlice.reducer;
