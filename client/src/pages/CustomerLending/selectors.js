import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectCustomerLendingListState = (state) => state.customerLending || initialState;

export const selectCustomerLending = createSelector(selectCustomerLendingListState, (state) => state.customerLending);
