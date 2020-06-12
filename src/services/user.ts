import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiInstance from '../utils/api';

export interface UserState {
  token?: string;
}

const initialState: UserState = {};

export const login = createAsyncThunk(
  'LOGIN',
  async (payload: { username: string; password: string }) => {
    const response = await apiInstance.post('/token-auth', payload);
    return response.data;
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      const { token } = action.payload;
      // TODO: should probably move the setting of the Authorization header to somewhere outside the reducer
      apiInstance.defaults.headers.common.Authorization = `JWT ${token}`;
      return {
        ...state,
        token,
      };
    });
  },
});
