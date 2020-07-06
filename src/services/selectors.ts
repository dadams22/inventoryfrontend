import { itemsAdapter } from './items';
import { ApplicationState } from '../store';
import { scalesAdapter } from './scales';

export const itemsSelectors = itemsAdapter.getSelectors(
  (state: ApplicationState) => state.items.items,
);
export const scalesSelectors = scalesAdapter.getSelectors(
  (state: ApplicationState) => state.scales.scales,
);
