import { EDIT_USER, GET_USER_BY_ID, SET_USER_BY_ID } from './constants';

export const doEditUser = (id, user, cb) => ({
  type: EDIT_USER,
  id,
  user,
  cb,
});

export const getUserById = (id, header, cb) => ({
  type: GET_USER_BY_ID,
  id,
  cb,
  header,
});

export const setUserById = (user) => ({
  type: SET_USER_BY_ID,
  user,
});
