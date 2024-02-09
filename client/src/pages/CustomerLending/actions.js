import { SET_CUSTOMER_LENDING, GET_CUSTOMER_LENDING } from './constants';

export const getCustomerLending = (id, cb) => {
  console.log(id);
  return {
    type: GET_CUSTOMER_LENDING,
    id,
    cb,
  };
};

export const setCustomerLending = (customerLending) => {
  console.log(customerLending);
  return {
    type: SET_CUSTOMER_LENDING,
    customerLending,
  };
};
