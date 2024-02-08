import { SET_CUSTOMER } from './constants';

export const doRegisterCustomer = (user, cb) => ({
  type: SET_CUSTOMER,
  user,
  cb,
});
