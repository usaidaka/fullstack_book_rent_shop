import { takeLatest, call, put } from 'redux-saga/effects';
import { setLoading, showPopup } from '@containers/App/actions';
import { getCustomerList } from '@domain/api';
import { setCustomer } from './actions';
import { GET_CUSTOMER } from './constants';

function* getAllCustomer() {
  yield put(setLoading(true));
  try {
    const response = yield call(getCustomerList);
    yield put(setCustomer(response?.result));
  } catch (error) {
    yield put(showPopup('Error', error.message));
  }
  yield put(setLoading(false));
}

export default function* customerListSaga() {
  yield takeLatest(GET_CUSTOMER, getAllCustomer);
}
