import { PATCH_BOOK, GET_BOOK_BY_ID, SET_BOOK_BY_ID } from './constants';

export const doRegister = (user, header, cb) => ({
  type: PATCH_BOOK,
  user,
  header,
  cb,
});

export const getBookById = (id) => ({
  type: GET_BOOK_BY_ID,
  id,
});

export const setBookById = (book) => ({
  type: SET_BOOK_BY_ID,
  book,
});
