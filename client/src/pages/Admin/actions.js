import { GET_ADMIN, SET_ADMIN } from './constants';

export const getAdmin = (header) => ({
  type: GET_ADMIN,
  header,
});

export const setAdmin = (admins) => ({
  type: SET_ADMIN,
  admins,
});
