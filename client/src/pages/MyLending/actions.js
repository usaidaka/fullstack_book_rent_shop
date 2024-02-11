import { SET_MY_LENDING, GET_MY_LENDING } from './constants';

export const getMyLending = (cb) => ({
  type: GET_MY_LENDING,
  cb,
});

export const setLending = (myLending) => ({
  type: SET_MY_LENDING,
  myLending,
});
