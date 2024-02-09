import { all } from 'redux-saga/effects';

import appSaga from '@containers/App/saga';
import loginSaga from '@pages/Login/saga';
import editProfileAdminSaga from '@pages/EditProfileAdmin/saga';
import registerAdminSaga from '@pages/RegisterAdmin/saga';
import registerBookSaga from '@pages/RegisterBook/saga';
import registerCustomerSaga from '@pages/RegisterCustomer/saga';
import editUserSaga from '@pages/EditUser/saga';
import bookListSaga from '@pages/Book/saga';
import adminListSaga from '@pages/Admin/saga';
import customerListSaga from '@pages/Customer/saga';
import editBookSaga from '@pages/EditBook/saga';
import getDashboardData from '@pages/Dashboard/saga';
import registerLendingSaga from '@pages/RegisterLending/saga';
import lendingListSaga from '@pages/LendingList/saga';
import deleteLendingSaga from '@pages/DeleteLending/saga';
import changePasswordAdmin from '@pages/ChangePasswordAdmin/saga';
import myLendingListSaga from '@pages/MyLending/saga';
import customerLendingSaga from '@pages/CustomerLending/saga';

export default function* rootSaga() {
  yield all([
    appSaga(),
    loginSaga(),
    editProfileAdminSaga(),
    editUserSaga(),
    editBookSaga(),
    bookListSaga(),
    adminListSaga(),
    customerListSaga(),
    registerCustomerSaga(),
    registerAdminSaga(),
    registerBookSaga(),
    getDashboardData(),
    registerLendingSaga(),
    lendingListSaga(),
    deleteLendingSaga(),
    changePasswordAdmin(),
    myLendingListSaga(),
    customerLendingSaga(),
  ]);
}
