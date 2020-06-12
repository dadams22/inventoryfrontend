import { createSlice } from '@reduxjs/toolkit';

export interface Scale {
  id: number;
  inUse: boolean;
}

export interface ScalesState {
  scales: Scale[];
}

const initialState: ScalesState = {
  scales: [],
};

export const scalesSlice = createSlice({
  name: 'scales',
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});
