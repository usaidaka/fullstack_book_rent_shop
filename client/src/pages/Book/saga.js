import { takeLatest, call, put } from 'redux-saga/effects';
import { setLoading, showPopup } from '@containers/App/actions';
import { getBookList } from '@domain/api';
import { setBook } from './actions';
import { GET_BOOK } from './constants';

function* getAllBook() {
  yield put(setLoading(true));
  try {
    const response = yield call(getBookList);
    console.log(response, '<< response');
    yield put(setBook(response?.result));
  } catch (error) {
    console.error(error);
    yield put(showPopup('Error', error.message));
  }
  yield put(setLoading(false));
}

export default function* bookListSaga() {
  yield takeLatest(GET_BOOK, getAllBook);
}
