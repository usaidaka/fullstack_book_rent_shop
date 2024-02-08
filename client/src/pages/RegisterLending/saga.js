import { takeLatest, call, put } from 'redux-saga/effects';
import { registerLending } from '@domain/api';
import { setLoading, showPopup } from '@containers/App/actions';

import { POST_LENDING } from './constants';

function* doRegisterLending({ data, cb }) {
  console.log(data);
  setLoading(true);
  try {
    const response = yield call(registerLending, data);

    cb && cb(response.message);
  } catch (error) {
    yield put(showPopup('Error', error.response?.data?.message));
  }
  setLoading(false);
}

export default function* registerLendingSaga() {
  yield takeLatest(POST_LENDING, doRegisterLending);
}
