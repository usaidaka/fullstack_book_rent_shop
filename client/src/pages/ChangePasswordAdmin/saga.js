import { takeLatest, call, put } from 'redux-saga/effects';
import { editPassword } from '@domain/api';
import { setLoading, showPopup } from '@containers/App/actions';

import { PATCH_CHANGE_PASSWORD_ADMIN } from './constants';

function* doChangePasswordAdmin({ data, cb }) {
  setLoading(true);
  try {
    const response = yield call(editPassword, data);

    cb && cb(response.message);
  } catch (error) {
    if (error.response?.data?.message) {
      yield put(showPopup('Error', error.response?.data?.message));
    } else {
      yield put(showPopup('Error', error.response?.data?.error));
    }
  }
  setLoading(false);
}

export default function* changePasswordAdmin() {
  yield takeLatest(PATCH_CHANGE_PASSWORD_ADMIN, doChangePasswordAdmin);
}
