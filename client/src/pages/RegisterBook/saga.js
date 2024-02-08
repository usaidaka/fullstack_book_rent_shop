import { takeLatest, call, put } from 'redux-saga/effects';
import { registerBook } from '@domain/api';
import { setLoading, showPopup } from '@containers/App/actions';

import { SET_BOOK } from './constants';

function* doRegisterBook({ book, cb }) {
  setLoading(true);

  try {
    const response = yield call(registerBook, book);

    cb && cb(response.message);
  } catch (error) {
    if (error.response?.data?.message) {
      yield put(showPopup('Error', error.response?.data?.message));
    } else {
      yield put(showPopup('Error', error.response?.data?.error));
    }
  }
  setLoading(false);
}

export default function* registerBookSaga() {
  yield takeLatest(SET_BOOK, doRegisterBook);
}
