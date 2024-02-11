import { takeLatest, call, put } from 'redux-saga/effects';
import { getMyLendingList } from '@domain/api';
import { setLoading, showPopup } from '@containers/App/actions';

import { GET_MY_LENDING } from './constants';
import { setLending } from './actions';

function* doGetMyLendingList({ cb }) {
  setLoading(true);
  try {
    const response = yield call(getMyLendingList);
    console.log(response);
    cb && cb();

    yield put(setLending(response.result));
  } catch (error) {
    yield put(showPopup('Error', error.response?.data?.message));
  }
  setLoading(false);
}

export default function* myLendingListSaga() {
  yield takeLatest(GET_MY_LENDING, doGetMyLendingList);
}
