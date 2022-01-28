import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://lit-headland-14010.herokuapp.com/api/';

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

export const register = createAsyncThunk(
  'auth/signup',
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('auth/signup', credentials);
      token.set(data.token);
      return data;
    } catch (error) {
      /* if (error.response.status === 409) {
            throw new Error('Email already registrated')
         }
         if (!error.response) {
            throw new Error('Register failed')
         } */
      return rejectWithValue(error.response.data);
    }
  },
);

export const logIn = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('auth/login', credentials);
      token.set(data.token);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const logOut = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await axios.post('auth/logout');
      token.unset();
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const setUserBalance = createAsyncThunk(
  '/users/setUserBalance',
  async (newBalance, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/users/', newBalance);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const getUserBalance = createAsyncThunk(
  '/users/getUserBalance',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('/users/');
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchCurrentUser = createAsyncThunk(
  'auth/current',
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const persistedToken = state.auth.token;
    console.log(state.auth.user.data);
    if (persistedToken === null) {
      return rejectWithValue();
    }

    token.set(persistedToken);
    try {
      const { data } = await axios.get('auth/current');
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const operations = {
  register,
  logIn,
  logOut,
  setUserBalance,
  getUserBalance,
  fetchCurrentUser,
  token,
};

export default operations;
