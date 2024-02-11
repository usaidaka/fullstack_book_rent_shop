import { SET_CUSTOMER_LENDING, GET_CUSTOMER_LENDING } from './constants';

export const getCustomerLending = (id, cb) => ({
  type: GET_CUSTOMER_LENDING,
  id,
  cb,
});

export const setCustomerLending = (customerLending) => ({
  type: SET_CUSTOMER_LENDING,
  customerLending,
});
