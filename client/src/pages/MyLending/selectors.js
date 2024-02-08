import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectMyLendingListState = (state) => state.myLendingList || initialState;

export const selectMyLendingList = createSelector(selectMyLendingListState, (state) => state.myLending);
