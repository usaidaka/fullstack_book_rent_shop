import { SET_CUSTOMER } from './constants';

export const doRegisterCustomer = (user, header, cb) => ({
  type: SET_CUSTOMER,
  user,
  header,
  cb,
});
