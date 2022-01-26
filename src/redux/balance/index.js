import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: null,
  isLoading: false,
  error: null,
  sumByCategoryIncome: null,
  sumByCategoryConsumption: null,
  category: null,
};

const balanceSlice = createSlice({
  name: 'balance',
  initialState,
  reducers: {
    fetchBalanse(state) {
      state.isLoading = true;
    },
    fetchSuccess(state, { payload }) {
      state.data = payload;
      state.isLoading = false;
    },
    fetchError(state, { payload }) {
      state.error = payload;
      state.isLoading = false;
    },
    sumByCategoryIncome(state, { payload }) {
      state.sumByCategoryIncome = payload;
    },
    sumByCategoryConsumption(state, { payload }) {
      state.sumByCategoryConsumption = payload;
    },
    setCategity(state, { payload }) {
      state.category = payload;
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
  sumByCategoryIncome,
  sumByCategoryConsumption,
  setCategity,
} = balanceSlice.actions;

export default balanceSlice.reducer;
