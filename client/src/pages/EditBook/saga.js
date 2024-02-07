import { takeLatest, call, put } from 'redux-saga/effects';
import { getBookDetail, registerBook } from '@domain/api';
import { setLoading, showPopup } from '@containers/App/actions';

import { PATCH_BOOK, GET_BOOK_BY_ID } from './constants';
import { setBookById } from './actions';

function* doRegisterBook({ user, header, cb }) {
  setLoading(true);
  try {
    const response = yield call(registerBook, user, header);

    if (response) {
      cb && cb();
    }
  } catch (error) {
    yield put(showPopup('Error', error.response?.data?.message));
  }
  setLoading(false);
}

function* doGetBookById({ id }) {
  setLoading(true);
  try {
    const response = yield call(getBookDetail, id);
    console.log(response.result, '<<<BOOK DETAIL');
    yield put(setBookById(response.result));
  } catch (error) {
    console.log(error);
    yield put(showPopup('Error', error.response?.data?.message));
  }
  setLoading(false);
}

export default function* editBookSaga() {
  yield takeLatest(PATCH_BOOK, doRegisterBook);
  yield takeLatest(GET_BOOK_BY_ID, doGetBookById);
}
