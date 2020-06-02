import { ApplicationState } from "./types";
import { ApplicationAction } from "./actions";


const initialState: ApplicationState = {
    items: [
        {
            id: 1,
            name: 'Chicken',
            weight: 15.2,
        },
        {
            id: 2,
            name: 'Steak',
            weight: 30.7,
        },
        {
            id: 3,
            name: 'Rice',
            weight: 60.8,
        },
        {
            id: 4,
            name: 'Tortillas',
            weight: 7.5,
        },
        {
            id: 5,
            name: 'Peppers',
            weight: 18,
        }
    ],
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