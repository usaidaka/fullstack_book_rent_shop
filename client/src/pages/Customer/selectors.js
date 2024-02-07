import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectCustomerListState = (state) => state.customerList || initialState;

export const selectCustomerList = createSelector(selectCustomerListState, (state) => state.customers);
