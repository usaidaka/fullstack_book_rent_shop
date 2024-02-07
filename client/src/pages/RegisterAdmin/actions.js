import { SET_ADMIN } from './constants';

export const doRegister = (user, cb) => ({
  type: SET_ADMIN,
  user,
  cb,
});
