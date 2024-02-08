import { SET_BOOK } from './constants';

export const doRegisterBook = (book, cb) => ({
  type: SET_BOOK,
  book,
  cb,
});
