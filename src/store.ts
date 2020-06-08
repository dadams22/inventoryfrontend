import { logger } from 'redux-logger';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import applicationReducer from './services/reducer';

const store = configureStore({
  reducer: applicationReducer,
  middleware: [...getDefaultMiddleware(), logger],
});

export default store;
