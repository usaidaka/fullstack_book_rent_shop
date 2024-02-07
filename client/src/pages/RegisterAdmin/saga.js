import { takeLatest, call, put } from 'redux-saga/effects';
import { registerAdmin } from '@domain/api';
import { setLoading, showPopup } from '@containers/App/actions';

import { SET_ADMIN } from './constants';

function* doRegisterAdmin({ user, cb }) {
  setLoading(true);
  try {
    yield call(registerAdmin, user);

    cb && cb();
  } catch (error) {
    yield put(showPopup('Error', error.response?.data?.message));
  }
  setLoading(false);
}

export default function* registerAdminSaga() {
  yield takeLatest(SET_ADMIN, doRegisterAdmin);
}
