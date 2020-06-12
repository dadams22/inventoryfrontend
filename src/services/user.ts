import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiInstance, { isAuthenticated, removeTokenAuth, setTokenAuth } from '../utils/api';

export interface UserState {
  authenticated: boolean;
}

const initialState: UserState = {
  authenticated: isAuthenticated(),
};

export const login = createAsyncThunk(
  'LOGIN',
  async (payload: { username: string; password: string }) => {
    const response = await apiInstance.post('/token-auth', payload);
    return response.data;
  },
);

export const logout = createAction('LOGOUT');

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
  },
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
    // TODO: should probably not have this in extraReducers and shoulr probably move removeTokenAuth somewhere else
    builder.addCase(logout, (state) => {
      removeTokenAuth();
      return { ...state, authenticated: false };
    })
  },
});
