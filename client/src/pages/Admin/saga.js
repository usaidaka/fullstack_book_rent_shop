import { takeLatest, call, put } from 'redux-saga/effects';
import { setLoading, showPopup } from '@containers/App/actions';
import { getAdminList } from '@domain/api';
import { setAdmin } from './actions';
import { GET_ADMIN } from './constants';

function* getAllAdmin() {
  yield put(setLoading(true));
  try {
    const response = yield call(getAdminList);
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
