import { createSlice } from '@reduxjs/toolkit';
import operations from './auth-operations';

const initialState = {
  user: {
    name: null,
    email: null,
    avatar: null,
  },
  balance: 0,
  token: null,
  isLoggedIn: false,
  isLoading: false,
  isFetchingCurrentUser: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: {
    [operations.register.fulfilled](state, action) {
      state.user.name = action.payload.data.name;
      state.user.email = action.payload.data.email;
      state.token = action.payload.token;
      state.isLoggedIn = false;
      state.isLoading = false;
      state.error = null;
    },
    [operations.register.pending](state) {
      state.isLoading = true;
      state.error = null;
    },
    [operations.register.rejected](state, action) {
      state.isLoading = false;
      state.error = action.error.message;
    },

    [operations.logIn.fulfilled](state, action) {
      state.user.name = action.payload.data.name;
      state.user.email = action.payload.data.email;
      state.user.avatar = action.payload.data.avatarURL;
      state.balance = action.payload.data.balance;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.isLoading = false;
      state.error = null;
    },
    [operations.logIn.pending](state) {
      state.error = null;
      state.isLoggedIn = false;
      state.isLoading = true;
    },
    [operations.logIn.rejected](state, action) {
      state.isLoading = false;
      if (action.payload) {
        state.error = action.payload.message;
      } else {
        state.error = action.error.message;
      }
    },

    [operations.logOut.fulfilled](state) {
      state.user = { name: null, email: null, avatar: null };
      state.balance = 0;
      state.token = null;
      state.isLoggedIn = false;
      state.isLoading = false;
      state.error = null;
    },
    [operations.logOut.pending](state) {
      state.isLoading = true;
      state.error = null;
    },
    [operations.logOut.rejected](state, action) {
      state.isLoading = false;
      state.error = action.error.message;
    },

    [operations.fetchCurrentUser.fulfilled](state, action) {
      state.user.name = action.payload.data.name;
      state.user.email = action.payload.data.email;
      state.user.avatar = action.payload.data.avatarURL;
      state.balance = action.payload.data.balance;
      state.isLoggedIn = true;
      state.isLoading = false;
      state.isFetchingCurrentUser = false;
    },
    [operations.fetchCurrentUser.pending](state) {
      state.isLoggedIn = false;
      state.isLoading = true;
      state.isFetchingCurrentUser = true;
    },
    [operations.fetchCurrentUser.rejected](state) {
      state.isLoggedIn = false;
      state.isLoading = false;
      state.isFetchingCurrentUser = false;
    },

    [operations.setUserBalance.fulfilled](state, action) {
      state.balance = action.payload.balance;
      state.error = null;
    },
    [operations.setUserBalance.pending](state) {
      state.error = null;
    },
    [operations.setUserBalance.rejected](state, action) {
      state.error = action.error.message;
    },

    [operations.getUserBalance.fulfilled](state, action) {
      state.balance = action.payload.balance;
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
