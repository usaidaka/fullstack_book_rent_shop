import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectLendingListState = (state) => state.lendingList || initialState;

export const selectLendingList = createSelector(selectLendingListState, (state) => state.lending);
