import { takeLatest, call, put } from 'redux-saga/effects';
import { register } from '@domain/api';
import { setLoading, showPopup } from '@containers/App/actions';

import { SET_USER } from './constants';

function* doRegister({ user, cb }) {
  setLoading(true);
  try {
    const response = yield call(register, user);

    if (response) {
      cb && cb();
    }
  } catch (error) {
    yield put(showPopup('Error', error.response?.data?.message));
  }
  setLoading(false);
}

export default function* registerSaga() {
  yield takeLatest(SET_USER, doRegister);
}
