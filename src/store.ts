import { logger } from 'redux-logger';
import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import { userSlice } from './services/user';
import { itemsSlice } from './services/items';
import { scalesSlice } from './services/scales';

const applicationReducer = combineReducers({
  user: userSlice.reducer,
  items: itemsSlice.reducer,
  scales: scalesSlice.reducer,
});

export type ApplicationState = ReturnType<typeof applicationReducer>;

const store = configureStore({
  reducer: applicationReducer,
  middleware: [...getDefaultMiddleware(), logger],
});

export default store;
