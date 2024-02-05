import { DO_LOGIN } from './constants';

export const doLoginAction = (data, cb, callback) => ({
  type: DO_LOGIN,
  data,
  cb,
  callback,
});
