import { combineReducers } from 'redux';

import appReducer, { storedKey as storedAppState } from '@containers/App/reducer';
import clientReducer, { storedKey as storedClientState } from '@containers/Client/reducer';
import bookReducer, { storedKey as storedBookState } from '@pages/Book/reducer';
import adminReducer, { storedKey as storedAdminState } from '@pages/Admin/reducer';
import customerReducer, { storedKey as storedCustomerState } from '@pages/Customer/reducer';
import getAllDashboardData, { storedKey as storedCategoryState } from '@pages/Dashboard/reducer';
import getLendingListReducer, { storedKey as storedLendingState } from '@pages/LendingList/reducer';
import getMyLendingListReducer, { storedKey as storedMyLendingState } from '@pages/MyLending/reducer';

import editBookReducer from '@pages/EditBook/reducer';
import editProfileReducer from '@pages/EditProfileAdmin/reducer';
import editUserReducer from '@pages/EditUser/reducer';
import languageReducer from '@containers/Language/reducer';

import { mapWithPersistor } from './persistence';

const storedReducers = {
  app: { reducer: appReducer, whitelist: storedAppState },
  client: { reducer: clientReducer, whitelist: storedClientState },
  bookList: { reducer: bookReducer, whitelist: storedBookState },
  adminList: { reducer: adminReducer, whitelist: storedAdminState },
  customerList: { reducer: customerReducer, whitelist: storedCustomerState },
  dashboardData: { reducer: getAllDashboardData, whitelist: storedCategoryState },
  lendingList: { reducer: getLendingListReducer, whitelist: storedLendingState },
  myLendingList: { reducer: getMyLendingListReducer, whitelist: storedMyLendingState },
};

const temporaryReducers = {
  language: languageReducer,
  bookDetail: editBookReducer,
  userDetail: editUserReducer,
  profile: editProfileReducer,
  dashboard: getAllDashboardData,
};

const createReducer = () => {
  const coreReducer = combineReducers({
    ...mapWithPersistor(storedReducers),
    ...temporaryReducers,
  });
  const rootReducer = (state, action) => coreReducer(state, action);
  return rootReducer;
};

export default createReducer;
