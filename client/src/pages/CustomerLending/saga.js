import { takeLatest, call, put } from 'redux-saga/effects';
import { getCustomerLending } from '@domain/api';
import { setLoading, showPopup } from '@containers/App/actions';

import { GET_CUSTOMER_LENDING } from './constants';
import { setCustomerLending } from './actions';

function* doGetCustomerLending({ id, cb }) {
  setLoading(true);
  try {
    const response = yield call(getCustomerLending, id);
    console.log(response);
    cb && cb();
    yield put(setCustomerLending(response.result));
  } catch (error) {
    yield put(showPopup('Error', error.response?.data?.message));
  }
  setLoading(false);
}

export default function* customerLendingSaga() {
  yield takeLatest(GET_CUSTOMER_LENDING, doGetCustomerLending);
}
