import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  EntityState,
} from '@reduxjs/toolkit';
import { message } from 'antd';
import apiInstance from '../utils/api';

export interface Scale {
  id: number;
  site: number;
  item: number;
  // inUse: boolean;
}

export interface ScalesState {
  scales: EntityState<Scale>;
}

export const scalesAdapter = createEntityAdapter<Scale>();

const initialState: ScalesState = {
  scales: scalesAdapter.getInitialState(),
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
      scalesAdapter.upsertMany(state.scales, action.payload);
    });
    builder.addCase(fetchScales.rejected, () => {
      message.error('Unable to retrieve scale data from the server');
    });
  },
});
