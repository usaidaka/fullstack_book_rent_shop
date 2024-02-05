import { takeLatest, call, put } from 'redux-saga/effects';
import { login } from '@domain/api';
import { setLogin, setToken, setUser } from '@containers/Client/actions';
import { setLoading, showPopup } from '@containers/App/actions';
import { DO_LOGIN } from './constants';

function* doLogin({ data, cb, callback }) {
  setLoading(true);
  try {
    const response = yield call(login, data);

    yield put(setLogin(true));
    yield put(setToken(response.token));
    yield put(setUser(response.result));

    cb && cb(response?.result?.role, response.message);
  } catch (error) {
    callback && callback(error.response?.data?.message);
    yield put(showPopup('Error', error.response?.data?.message));
  }
  setLoading(false);
}

export default function* loginSaga() {
  yield takeLatest(DO_LOGIN, doLogin);
}
