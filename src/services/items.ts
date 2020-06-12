import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiInstance from '../utils/api';

export interface InventoryItem {
  id: number;
  name: string;
  description: string;
  weight: number;
  created_at: any;
  site: number;
}

export interface ItemsState {
  items: InventoryItem[];
}

const initialState: ItemsState = {
  items: [],
};

export const fetchItems = createAsyncThunk(
  'FETCH_ITEMS',
  async () => {
    const response = await apiInstance.get('/items');
    return response.data;
  }
);

export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchItems.fulfilled, (state, action) => {
      const items = action.payload;
      return {
        ...state,
        items,
      }
    })
  },
});
