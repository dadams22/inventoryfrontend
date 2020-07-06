import { itemsAdapter } from './items';
import { ApplicationState } from '../store';

export const itemsSelectors = itemsAdapter.getSelectors((state: ApplicationState) => state.items.items);