import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiInstance, { setTokenAuth } from '../utils/api';

export interface UserState {
  authenticated: boolean;
}

const initialState: UserState = {
  authenticated: false,
};

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
      // TODO: should probably move the setting of the Authorization header and storage of token to somewhere outside the reducer
      setTokenAuth(token);
      return {
        ...state,
        authenticated: true,
      };
    });
  },
});
