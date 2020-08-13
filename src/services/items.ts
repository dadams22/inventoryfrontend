/* eslint-disable no-param-reassign */
import {
  createAction,
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  EntityState,
} from '@reduxjs/toolkit';
import { message } from 'antd';
import apiInstance from '../utils/api';

export interface ItemStocking {
  id: number;
  created_at: string;
  scales: number[];
  last_measurement: number | null;
}

export interface InventoryItem {
  id: number;
  name: string;
  description?: string;
  created_at: string;
  site: number;
  scales: number[];
  last_measurement?: number | null;
}

export interface ItemsState {
  items: EntityState<InventoryItem>;
  addItemModalState: boolean;
  fetching: boolean;
}

export const itemsAdapter = createEntityAdapter<InventoryItem>();

const initialState: ItemsState = {
  items: itemsAdapter.getInitialState(),
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
    // TODO: fix typing here
    // @ts-ignore
    const data = await apiInstance.createItem(payload);
    return data;
  },
);

export const deleteItem = createAsyncThunk(
  'DELETE_ITEM',
  async (id: number) => {
    const data = await apiInstance.deleteItem(id);
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
      state.fetching = true;
    });
    builder.addCase(fetchItems.fulfilled, (state, action) => {
      const items = action.payload;
      itemsAdapter.upsertMany(state.items, items);
      state.fetching = false;
    });
    builder.addCase(fetchItems.rejected, (state) => {
      state.fetching = false;
      message.error('Unable to retrieve item data from the server');
    });
    builder.addCase(createItem.fulfilled, (state, action) => {
      const newItem = action.payload as InventoryItem;
      itemsAdapter.addOne(state.items, newItem);
      message.success(`Item '${newItem.name}' successfully created`);
      state.addItemModalState = false;
    });
    builder.addCase(createItem.rejected, () => {
      message.error('Error: Item creation failed');
    });
    builder.addCase(deleteItem.fulfilled, (state, action) => {
      const deletedItemId = action.meta.arg;
      itemsAdapter.removeOne(state.items, deletedItemId);
      message.success('Item successfully deleted');
    });
    builder.addCase(deleteItem.rejected, () => {
      message.error('Item deletion failed');
    });
    builder.addCase(setAddItemModalState, (state, action) => {
      state.addItemModalState = action.payload;
    });
  },
});
