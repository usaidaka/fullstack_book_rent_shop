import { takeLatest, call, put } from 'redux-saga/effects';
import { editBook, getBookDetail } from '@domain/api';
import { setLoading, showPopup } from '@containers/App/actions';

import { PATCH_BOOK, GET_BOOK_BY_ID } from './constants';
import { setBookById } from './actions';

function* doEditBook({ book, id, cb }) {
  setLoading(true);
  try {
    const response = yield call(editBook, id, book);

    cb && cb(response.message);
  } catch (error) {
    console.log(error);
    yield put(showPopup('Error', error.response?.data?.message));
  }
  setLoading(false);
}

function* doGetBookById({ id, cb }) {
  setLoading(true);
  try {
    const response = yield call(getBookDetail, id);
    cb && cb();
    yield put(setBookById(response.result));
  } catch (error) {
    yield put(showPopup('Error', error.response?.data?.message));
  }
  setLoading(false);
}

export default function* editBookSaga() {
  yield takeLatest(PATCH_BOOK, doEditBook);
  yield takeLatest(GET_BOOK_BY_ID, doGetBookById);
}
