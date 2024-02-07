import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectUserDetailState = (state) => {
  console.log(state.userDetail);
  return state.userDetail || initialState;
};

export const selectUserDetail = createSelector(selectUserDetailState, (state) => {
  console.log(state.user);
  return state.user;
});
