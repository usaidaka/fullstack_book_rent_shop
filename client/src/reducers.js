import { combineReducers } from 'redux';

import appReducer, { storedKey as storedAppState } from '@containers/App/reducer';
import clientReducer, { storedKey as storedClientState } from '@containers/Client/reducer';
import bookReducer, { storedKey as storedBookState } from '@pages/Book/reducer';
import adminReducer, { storedKey as storedAdminState } from '@pages/Admin/reducer';
import customerReducer, { storedKey as storedCustomerState } from '@pages/Customer/reducer';
import editBookReducer from '@pages/EditBook/reducer';
import editProfileReducer from '@pages/EditProfile/reducer';
import editUserReducer from '@pages/EditUser/reducer';
import languageReducer from '@containers/Language/reducer';

import { mapWithPersistor } from './persistence';

const storedReducers = {
  app: { reducer: appReducer, whitelist: storedAppState },
  client: { reducer: clientReducer, whitelist: storedClientState },
  bookList: { reducer: bookReducer, whitelist: storedBookState },
  adminList: { reducer: adminReducer, whitelist: storedAdminState },
  customerList: { reducer: customerReducer, whitelist: storedCustomerState },
};

const temporaryReducers = {
  language: languageReducer,
  bookDetail: editBookReducer,
  userDetail: editUserReducer,
  profile: editProfileReducer,
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
