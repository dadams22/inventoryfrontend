import { createStore } from "redux";
import { applicationReducer } from "./services/reducer";

export const store = createStore(applicationReducer);