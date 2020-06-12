import { createSlice } from '@reduxjs/toolkit';

export interface InventoryItem {
  id: number;
  name: string;
  weight: number;
}

export interface ItemsState {
  items: InventoryItem[];
}

const initialState: ItemsState = {
  items: [],
};

export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});
