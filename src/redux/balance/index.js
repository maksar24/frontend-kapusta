import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: null,
  isLoading: false,
  error: null,
  sumByCategoryIncome: null,
  sumByCategoryConsumption: null,
  sumDescription: null,
  category: null,
  income: null,
  consumption: null,
  summary: [],
  active: 0,
};

const balanceSlice = createSlice({
  name: 'balance',
  initialState,
  reducers: {
    setIsLoading(state, { payload }) {
      state.isLoading = payload;
    },
    fetchSuccess(state, { payload }) {
      state.data = payload;
    },
    fetchError(state, { payload }) {
      state.error = payload;
    },
    sumByCategoryIncome(state, { payload }) {
      state.sumByCategoryIncome = payload;
    },
    sumByCategoryConsumption(state, { payload }) {
      state.sumByCategoryConsumption = payload;
    },
    setCategory(state, { payload }) {
      state.category = payload;
    },
    sumDescription(state, { payload }) {
      state.sumDescription = payload;
    },

    incomeData(state, { payload }) {
      state.income = payload;
    },
    consumptionData(state, { payload }) {
      state.consumption = payload;
    },
    summary(state, { payload }) {
      state.summary = payload;
    },
    clearChartData(state) {
      state.category = null;
    },
    changeActive(state, { payload }) {
      state.active = payload;
    },
  },
});

export const {
  setIsLoading,
  fetchSuccess,
  fetchError,
  sumByCategoryIncome,
  sumByCategoryConsumption,
  setCategory,
  sumDescription,
  clearChartData,
  summary,
  incomeData,
  consumptionData,
  changeActive,
} = balanceSlice.actions;

export default balanceSlice.reducer;
