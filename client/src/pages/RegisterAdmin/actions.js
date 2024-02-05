import { SET_USER } from './constants';

export const doRegister = (user, cb) => ({
  type: SET_USER,
  user,
  cb,
});
