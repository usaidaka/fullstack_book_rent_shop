import { takeLatest, call, put } from 'redux-saga/effects';
import { registerCustomer } from '@domain/api';
import { setLoading, showPopup } from '@containers/App/actions';

import { SET_CUSTOMER } from './constants';

function* doRegisterCustomer({ user, header, cb }) {
  setLoading(true);
  try {
    const response = yield call(registerCustomer, user, header);

    cb && cb(response.message);
  } catch (error) {
    yield put(showPopup('Error', error.response?.data?.message));
  }
  setLoading(false);
}

export default function* registerCustomerSaga() {
  yield takeLatest(SET_CUSTOMER, doRegisterCustomer);
}
