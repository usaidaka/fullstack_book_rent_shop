import { takeLatest, call, put } from 'redux-saga/effects';
import { setLoading, showPopup } from '@containers/App/actions';
import { deleteBook, getBookList } from '@domain/api';
import { setBook } from './actions';
import { DELETE_BOOK, GET_BOOK } from './constants';

function* getAllBook() {
  yield put(setLoading(true));
  try {
    const response = yield call(getBookList);

    yield put(setBook(response?.result));
  } catch (error) {
    yield put(showPopup('Error', error.response?.data?.message));
  }
  yield put(setLoading(false));
}

function* doDeleteBook({ id, cb }) {
  yield put(setLoading(true));
  try {
    const response = yield call(deleteBook, id);
    cb && cb(response.message);
  } catch (error) {
    yield put(showPopup('Error', error.response?.data?.message));
  }
  yield put(setLoading(false));
}

export default function* bookListSaga() {
  yield takeLatest(GET_BOOK, getAllBook);
  yield takeLatest(DELETE_BOOK, doDeleteBook);
}
