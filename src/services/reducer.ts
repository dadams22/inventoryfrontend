import { ApplicationState } from "./types";
import {ApplicationAction} from "./actions";


const initialState: ApplicationState = {

};

export function applicationReducer(
    state = initialState,
    action: ApplicationAction
) {
    switch (action.type) {
        default:
            return state;
    }
}