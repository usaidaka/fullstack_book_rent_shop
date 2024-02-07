import { takeLatest, call, put } from 'redux-saga/effects';
import { setLoading, showPopup } from '@containers/App/actions';
import { getAdminList } from '@domain/api';
import { setAdmin } from './actions';
import { GET_ADMIN } from './constants';

function* getAllAdmin({ header }) {
  yield put(setLoading(true));
  try {
    console.log(header);
    const response = yield call(getAdminList, header);
    console.log(response, '<< response');
    yield put(setAdmin(response?.result));
  } catch (error) {
    console.error(error);
    yield put(showPopup('Error', error.message));
  }
  yield put(setLoading(false));
}

export default function* adminListSaga() {
  yield takeLatest(GET_ADMIN, getAllAdmin);
}
