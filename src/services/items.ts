import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiInstance from '../utils/api';

export interface InventoryItem {
  id: number;
  name: string;
  description: string;
  weight: number;
  created_at: string;
  site: number;
}

export interface ItemsState {
  items: InventoryItem[];
  addItemModalState: boolean;
}

const initialState: ItemsState = {
  items: [],
  addItemModalState: false,
};

export const fetchItems = createAsyncThunk('FETCH_ITEMS', async () => {
  const data = await apiInstance.fetchItems();
  data.forEach((item: InventoryItem) => item.weight = (Math.random() * 20));
  return data;
});

export const createItem = createAsyncThunk(
  'CREATE_ITEM',
  async (payload: Object) => {
    // @ts-ignore
    const data = await apiInstance.createItem(payload);
    data.weight = Math.random() * 20;
    return data;
  },
);

export const setAddItemModalState = createAction<boolean>(
  'SET_ADD_ITEM_MODAL_STATE',
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
    builder.addCase(createItem.fulfilled, (state, action) => {
      const newItem = action.payload as InventoryItem;
      return {
        ...state,
        items: [...state.items, newItem],
        addItemModalState: false,
      };
    });
    builder.addCase(setAddItemModalState, (state, action) => {
      return {
        ...state,
        addItemModalState: action.payload,
      };
    });
  },
});
