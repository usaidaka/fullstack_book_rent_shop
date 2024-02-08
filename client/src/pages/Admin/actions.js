import { GET_ADMIN, SET_ADMIN } from './constants';

export const getAdmin = () => ({
  type: GET_ADMIN,
});

export const setAdmin = (admins) => ({
  type: SET_ADMIN,
  admins,
});
