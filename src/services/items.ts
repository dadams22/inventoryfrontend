import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiInstance from '../utils/api';

export interface InventoryItem {
  id: number;
  name: string;
  description: string;
  weight: number;
  // created_at: any;
  site: number;
}

export interface ItemsState {
  items: InventoryItem[];
}

const initialState: ItemsState = {
  items: [],
};

export const fetchItems = createAsyncThunk('FETCH_ITEMS', async () => {
  return apiInstance.fetchItems();
});

export const createItem = createAsyncThunk(
  'CREATE_ITEM',
  async (payload: Object) => {
    // @ts-ignore
    return apiInstance.createItem(payload);
  },
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
      };
    });
  },
});
