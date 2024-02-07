import { GET_CUSTOMER, SET_CUSTOMER } from './constants';

export const getCustomer = (header, id) => ({
  type: GET_CUSTOMER,
  header,
});

export const setCustomer = (customers) => ({
  type: SET_CUSTOMER,
  customers,
});
