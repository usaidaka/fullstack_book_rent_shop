import { takeLatest, call, put } from 'redux-saga/effects';
import { editProfile } from '@domain/api';
import { setLoading, showPopup } from '@containers/App/actions';

import { EDIT_PROFILE } from './constants';

function* doEditProfile({ user, cb }) {
  setLoading(true);
  try {
    const response = yield call(editProfile, user);

    if (!response.ok) {
      yield put(showPopup('Error', response.message));
    }
    cb && cb(response.message);
  } catch (error) {
    yield put(showPopup('Error', error.response?.data?.message));
  }
  setLoading(false);
}

export default function* editProfileAdminSaga() {
  yield takeLatest(EDIT_PROFILE, doEditProfile);
}
