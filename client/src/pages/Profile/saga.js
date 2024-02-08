import { takeLatest, call, put } from 'redux-saga/effects';
import { editUser } from '@domain/api';
import { setLoading, showPopup } from '@containers/App/actions';

import { EDIT_PROFILE } from './constants';

function* doEditProfile({ user, cb }) {
  setLoading(true);
  try {
    const response = yield call(editUser, user);

    cb && cb(response.message);
  } catch (error) {
    console.log(error);
    yield put(showPopup('Error', error.response?.data?.message));
  }
  setLoading(false);
}

export default function* editProfileSaga() {
  yield takeLatest(EDIT_PROFILE, doEditProfile);
}
