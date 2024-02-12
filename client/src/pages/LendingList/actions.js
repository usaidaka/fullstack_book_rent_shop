import { SET_LENDING, GET_LENDING } from './constants';

export const getLending = (cb) => ({
  type: GET_LENDING,
  cb,
});

export const setLending = (lending) => ({
  type: SET_LENDING,
  lending,
});
