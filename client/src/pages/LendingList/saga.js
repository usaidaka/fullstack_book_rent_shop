import { takeLatest, call, put } from 'redux-saga/effects';
import { getLendingList } from '@domain/api';
import { setLoading, showPopup } from '@containers/App/actions';

import { GET_LENDING } from './constants';
import { setLending } from './actions';

function* doGetLendingList() {
  setLoading(true);
  try {
    const response = yield call(getLendingList);

    yield put(setLending(response.result));
  } catch (error) {
    yield put(showPopup('Error', error.response?.data?.message));
  }
  setLoading(false);
}

export default function* lendingListSaga() {
  yield takeLatest(GET_LENDING, doGetLendingList);
}
