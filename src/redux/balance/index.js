import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: null,
  filteredData: null,
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
      state.data = payload;
      state.isLoading = false;
    },
    fetchError(state, { payload }) {
      state.error = payload;
      state.isLoading = false;
    },
    filteredData(state, { payload }) {
      state.filteredData = payload;
    },
  },
});

export const { fetchBalanse, fetchSuccess, fetchError, filteredData } =
  balanceSlice.actions;

export default balanceSlice.reducer;
