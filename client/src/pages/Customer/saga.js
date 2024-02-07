import { takeLatest, call, put } from 'redux-saga/effects';
import { setLoading, showPopup } from '@containers/App/actions';
import { getCustomerList } from '@domain/api';
import { setCustomer } from './actions';
import { GET_CUSTOMER } from './constants';

function* getAllCustomer({ header }) {
  yield put(setLoading(true));
  try {
    console.log(header);
    const response = yield call(getCustomerList, header);
    console.log(response, '<< response');
    yield put(setCustomer(response?.result));
  } catch (error) {
    console.error(error);
    yield put(showPopup('Error', error.message));
  }
  yield put(setLoading(false));
}

export default function* customerListSaga() {
  yield takeLatest(GET_CUSTOMER, getAllCustomer);
}
