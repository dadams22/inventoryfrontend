import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiInstance from '../utils/api';

export interface Scale {
  id: number;
  site: number;
  item: number;
  // inUse: boolean;
}

export interface ScalesState {
  scales: Scale[];
}

const initialState: ScalesState = {
  scales: [],
};

export const fetchScales = createAsyncThunk('FETCH_SCALES', async () => {
  return apiInstance.fetchScales();
});

export const scalesSlice = createSlice({
  name: 'scales',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchScales.fulfilled, (state, action) => {
      return {
        ...state,
        scales: action.payload,
      };
    });
  },
});
