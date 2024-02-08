import { takeLatest, call, put } from 'redux-saga/effects';
import { getCategoryList, getDashboard } from '@domain/api';
import { setLoading, showPopup } from '@containers/App/actions';

import { GET_CATEGORY, GET_DASHBOARD } from './constants';
import { setCategoryList, setDashboard } from './actions';

function* doGetCategoryList({ cb }) {
  setLoading(true);
  try {
    const response = yield call(getCategoryList);
    cb && cb();
    yield put(setCategoryList(response.result));
  } catch (error) {
    yield put(showPopup('Error', error.response?.data?.message));
  }
  setLoading(false);
}

function* doGetDashboard({ cb }) {
  setLoading(true);
  try {
    const response = yield call(getDashboard);
    cb && cb();
    yield put(setDashboard(response));
  } catch (error) {
    yield put(showPopup('Error', error.response?.data?.message));
  }
  setLoading(false);
}

export default function* getDashboardData() {
  yield takeLatest(GET_CATEGORY, doGetCategoryList);
  yield takeLatest(GET_DASHBOARD, doGetDashboard);
}
