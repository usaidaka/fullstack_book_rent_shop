import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectUserDetailState = (state) => state.userDetail || initialState;

export const selectUserDetail = createSelector(selectUserDetailState, (state) => state.user);
