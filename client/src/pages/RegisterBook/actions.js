import { SET_BOOK } from './constants';

export const doRegisterBook = (user, header, cb) => ({
  type: SET_BOOK,
  user,
  header,
  cb,
});
