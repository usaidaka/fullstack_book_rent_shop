import { SET_MY_LENDING, GET_MY_LENDING } from './constants';

export const getMyLending = () => ({
  type: GET_MY_LENDING,
});

export const setLending = (myLending) => ({
  type: SET_MY_LENDING,
  myLending,
});
