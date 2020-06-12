import { createSlice } from '@reduxjs/toolkit';

export interface InventoryItem {
  id: number;
  name: string;
  weight: number;
}

const initialState = {
  items: []
};

export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {},
  extraReducers: builder => {

  }
});