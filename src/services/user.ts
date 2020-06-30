import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiInstance from '../utils/api';

export interface UserState {
  authenticated: boolean;
}

const initialState: UserState = {
  authenticated: apiInstance.isAuthenticated(),
};

export const login = createAsyncThunk(
  'LOGIN',
  async (payload: { username: string; password: string }) => {
    return apiInstance.login(payload);
  },
);

export const logout = createAction('LOGOUT');

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state) => {
      return {
        ...state,
        authenticated: true,
      };
    });
    // TODO: should probably not have this in extraReducers and shoulr probably move removeTokenAuth somewhere else
    builder.addCase(logout, (state) => {
      apiInstance.removeTokenAuth();
      return { ...state, authenticated: false };
    });
  },
});
