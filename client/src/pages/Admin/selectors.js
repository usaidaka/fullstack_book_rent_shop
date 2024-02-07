import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectAdminListState = (state) => state.adminList || initialState;

export const selectAdminList = createSelector(selectAdminListState, (state) => state.admins);
