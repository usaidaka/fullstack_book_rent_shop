import { SET_LENDING, GET_LENDING } from './constants';

export const getLending = () => ({
  type: GET_LENDING,
});

export const setLending = (lending) => ({
  type: SET_LENDING,
  lending,
});
