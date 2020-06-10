import { createAsyncThunk } from '@reduxjs/toolkit';

const axios = require('axios').default;

const API_BASE_URL = 'http://127.0.0.1:8000/api';
const instance = axios.create({
  baseURL: API_BASE_URL,
});

export const actionTypes = {
  LOGIN: 'LOGIN',
};

export const login = createAsyncThunk(
  actionTypes.LOGIN,
  async (payload: { username: string; password: string }) => {
    const response = await instance.post('/token-auth', payload);
    console.log(response.data);
    return response.data;
  },
);

export type ApplicationAction = any;
