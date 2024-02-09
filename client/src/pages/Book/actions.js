import { DELETE_BOOK, GET_BOOK, SET_BOOK } from './constants';

export const getBook = () => ({
  type: GET_BOOK,
});

export const setBook = (books) => ({
  type: SET_BOOK,
  books,
});

export const deleteBook = (id, cb) => ({
  type: DELETE_BOOK,
  id,
  cb,
});
