import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

const register = createAsyncThunk(
  '/users/signup',
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('users/signup', credentials);
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

const logIn = createAsyncThunk(
  'users/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('users/login', credentials);
      token.set(data.token);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const logOut = createAsyncThunk(
  'users/logout',
  async (_, { rejectWithValue }) => {
    try {
      await axios.post('users/logout');
      token.unset();
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const setUserBalance = createAsyncThunk(
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

const getUserBalance = createAsyncThunk(
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

const fetchCurrentUser = createAsyncThunk(
  'auth/refresh',
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return rejectWithValue();
    }

    token.set(persistedToken);
    try {
      const { data } = await axios.get('users/current');
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
