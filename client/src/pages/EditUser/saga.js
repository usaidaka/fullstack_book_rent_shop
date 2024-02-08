import { takeLatest, call, put } from 'redux-saga/effects';
import { editUser, getCustomerDetail } from '@domain/api';
import { setLoading, showPopup } from '@containers/App/actions';

import { EDIT_USER, GET_USER_BY_ID } from './constants';
import { setUserById } from './actions';

function* doEditUser({ id, user, cb }) {
  setLoading(true);
  try {
    const response = yield call(editUser, id, user);

    cb && cb(response.message);
  } catch (error) {
    console.log(error);
    yield put(showPopup('Error', error.response?.data?.message));
  }
  setLoading(false);
}

function* doGetUserById({ id, header, cb }) {
  setLoading(true);
  try {
    const response = yield call(getCustomerDetail, id, header);

    cb && cb();
    yield put(setUserById(response.result));
  } catch (error) {
    yield put(showPopup('Error', error.response?.data?.message));
  }
  setLoading(false);
}

export default function* editUserSaga() {
  yield takeLatest(EDIT_USER, doEditUser);
  yield takeLatest(GET_USER_BY_ID, doGetUserById);
}
