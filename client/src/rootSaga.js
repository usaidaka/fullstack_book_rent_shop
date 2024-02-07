import { all } from 'redux-saga/effects';

import appSaga from '@containers/App/saga';
import loginSaga from '@pages/Login/saga';
import editProfileSaga from '@pages/EditProfile/saga';
import registerAdminSaga from '@pages/RegisterAdmin/saga';
import registerBookSaga from '@pages/RegisterBook/saga';
import registerCustomerSaga from '@pages/RegisterCustomer/saga';
import editUserSaga from '@pages/EditUser/saga';
import bookListSaga from '@pages/Book/saga';
import adminListSaga from '@pages/Admin/saga';
import customerListSaga from '@pages/Customer/saga';
import editBookSaga from '@pages/EditBook/saga';

export default function* rootSaga() {
  yield all([
    appSaga(),
    loginSaga(),
    editProfileSaga(),
    editUserSaga(),
    editBookSaga(),
    bookListSaga(),
    adminListSaga(),
    customerListSaga(),
    registerCustomerSaga(),
    registerAdminSaga(),
    registerBookSaga(),
  ]);
}
