import { createSlice } from '@reduxjs/toolkit';
import operations from './auth-operations';

const initialState = {
  user: {
    name: null,
    email: null,
    balance: null,
  },
  token: null,
  isLoggedIn: false,
  isFetchingCurrentUser: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    googleLogIn: (state, action) => {
      state.user.name = action.payload.name;
      state.user.email = action.payload.email;
      state.user.token = action.payload.token;
      state.user.balance = action.payload.balance;
      state.isLoggedIn = true;
      state.error = null;
    },
  },
  extraReducers: {
    [operations.register.fulfilled](state, action) {
      state.isLoggedIn = false;
      state.error = null;
    },
    [operations.register.pending](state) {
      state.error = null;
    },
    [operations.register.rejected](state, action) {
      state.error = action.error.message;
    },

    [operations.logIn.fulfilled](state, action) {
      state.user = action.payload;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.error = null;
    },
    [operations.logIn.pending](state) {
      state.error = null;
      state.isLoggedIn = false;
    },
    [operations.logIn.rejected](state, action) {
      if (action.payload) {
        state.error = action.payload.message;
      } else {
        state.error = action.error.message;
      }
    },

    [operations.logOut.fulfilled](state) {
      state.user = { name: null, email: null };
      state.token = null;
      state.isLoggedIn = false;
      state.error = null;
    },
    [operations.logOut.pending](state) {
      state.error = null;
    },
    [operations.logOut.rejected](state, action) {
      state.error = action.error.message;
    },

    [operations.fetchCurrentUser.fulfilled](state, action) {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.isFetchingCurrentUser = false;
    },
    [operations.fetchCurrentUser.pending](state) {
      state.isLoggedIn = false;
      state.isFetchingCurrentUser = true;
    },
    [operations.fetchCurrentUser.rejected](state) {
      state.isLoggedIn = false;
      state.isFetchingCurrentUser = false;
    },

    [operations.setUserBalance.fulfilled](state, action) {
      state.user.balance = action.payload.balance;
      state.error = null;
    },
    [operations.setUserBalance.pending](state) {
      state.error = null;
    },
    [operations.setUserBalance.rejected](state, action) {
      state.error = action.error.message;
    },

    [operations.getUserBalance.fulfilled](state, action) {
      state.user.balance = action.payload.balance;
      state.error = null;
    },
    [operations.getUserBalance.pending](state) {
      state.error = null;
    },
    [operations.getUserBalance.rejected](state, action) {
      state.error = action.error.message;
    },
  },
});

export const { googleLogIn } = authSlice.actions;
export default authSlice.reducer;
