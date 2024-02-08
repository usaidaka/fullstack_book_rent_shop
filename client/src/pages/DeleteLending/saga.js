import { takeLatest, call, put } from 'redux-saga/effects';
import { deleteLending } from '@domain/api';
import { setLoading, showPopup } from '@containers/App/actions';

import { DELETE_LENDING } from './constants';

function* doDeleteLending({ data, cb }) {
  setLoading(true);
  try {
    const response = yield call(deleteLending, data);

    cb && cb(response.message);
  } catch (error) {
    yield put(showPopup('Error', error.response?.data?.message));
  }
  setLoading(false);
}

export default function* deleteLendingSaga() {
  yield takeLatest(DELETE_LENDING, doDeleteLending);
}
