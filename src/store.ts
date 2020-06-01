import { applyMiddleware, createStore } from "redux";
import { applicationReducer } from "./services/reducer";
import { logger } from 'redux-logger';

export const store = createStore(
    applicationReducer,
    applyMiddleware(logger),
);