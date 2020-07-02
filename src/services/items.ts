import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';
import apiInstance from '../utils/api';

export interface InventoryItem {
  id: number;
  name: string;
  description: string;
  weight: number;
  created_at: string;
  site: number;
  scales: number[];
  last_measurement?: {
    value: number;
    timestamp: string;
  };
}

export interface ItemsState {
  items: InventoryItem[];
  addItemModalState: boolean;
  fetching: boolean;
}

const initialState: ItemsState = {
  items: [],
  addItemModalState: false,
  fetching: false,
};

export const fetchItems = createAsyncThunk('FETCH_ITEMS', async () => {
  const data = await apiInstance.fetchItems();
  return data;
});

export const createItem = createAsyncThunk(
  'CREATE_ITEM',
  async (payload: Object) => {
    // @ts-ignore
    const data = await apiInstance.createItem(payload);
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
    builder.addCase(fetchItems.pending, (state) => {
      return {
        ...state,
        fetching: true,
      };
    });
    builder.addCase(fetchItems.fulfilled, (state, action) => {
      const items = action.payload;
      return {
        ...state,
        items,
        fetching: false,
      };
    });
    builder.addCase(fetchItems.rejected, (state) => {
      return {
        ...state,
        fetching: false,
      };
    });
    builder.addCase(createItem.fulfilled, (state, action) => {
      const newItem = action.payload as InventoryItem;
      message.success(`Item '${newItem.name}' successfully created`);
      return {
        ...state,
        items: [...state.items, newItem],
        addItemModalState: false,
      };
    });
    builder.addCase(createItem.rejected, () => {
      message.error('Item creation failed');
    });
    builder.addCase(setAddItemModalState, (state, action) => {
      return {
        ...state,
        addItemModalState: action.payload,
      };
    });
  },
});
