import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const axios = require('axios').default;

const API_BASE_URL = 'http://127.0.0.1:8000/api';
const instance = axios.create({
  baseURL: API_BASE_URL,
});

export interface UserState {
  token?: string;
}

const initialState: UserState = {};

export const login = createAsyncThunk(
  'LOGIN',
  async (payload: { username: string; password: string }) => {
    const response = await instance.post('/token-auth', payload);
    return response.data;
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      const token = action.payload;
      return {
        ...state,
        token,
      };
    });
  },
});
