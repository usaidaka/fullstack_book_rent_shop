import { PATCH_BOOK, GET_BOOK_BY_ID, SET_BOOK_BY_ID } from './constants';

export const doEditBook = (book, id, cb) => ({
  type: PATCH_BOOK,
  book,
  id,
  cb,
});

export const getBookById = (id, cb) => ({
  type: GET_BOOK_BY_ID,
  cb,
  id,
});

export const setBookById = (book) => ({
  type: SET_BOOK_BY_ID,
  book,
});
