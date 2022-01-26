import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  finance: null,
  filteredDateData: null,
  income: null,
  consumption: null,
  isLoading: false,
  error: null,
};

const balanceSlice = createSlice({
  name: 'balance',
  initialState,
  reducers: {
    fetchBalanse(state) {
      state.isLoading = true;
    },
    fetchSuccess(state, { payload }) {
      state.finance = payload;
      state.isLoading = false;
    },
    fetchError(state, { payload }) {
      state.error = payload;
      state.isLoading = false;
    },
    filteredData(state, { payload }) {
      state.filteredData = payload;
    },
    incomeData(state, { payload }) {
      state.income = payload;
    },
    consumptionData(state, { payload }) {
      state.consumption = payload;
    },
  },
});

export const {
  fetchBalanse,
  fetchSuccess,
  fetchError,
  filteredData,
  incomeData,
  consumptionData,
} = balanceSlice.actions;

export default balanceSlice.reducer;
