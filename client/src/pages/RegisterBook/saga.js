import { takeLatest, call, put } from 'redux-saga/effects';
import { registerBook } from '@domain/api';
import { setLoading, showPopup } from '@containers/App/actions';

import { SET_BOOK } from './constants';

function* doRegisterBook({ user, header, cb }) {
  setLoading(true);
  try {
    yield call(registerBook, user, header);

    cb && cb();
  } catch (error) {
    yield put(showPopup('Error', error.response?.data?.message));
  }
  setLoading(false);
}

export default function* registerBookSaga() {
  yield takeLatest(SET_BOOK, doRegisterBook);
}
