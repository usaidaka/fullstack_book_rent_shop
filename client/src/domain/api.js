import config from '@config/index';
import { merge } from 'lodash';

import request from '@utils/request';

const urls = {
  ping: 'ping.json',
  login: '/login',

  /* EDIT */
  editUser: '/customer',
  editProfile: '/profile',
  editPassword: '/change-password',

  /* REGISTER */
  registerAdmin: '/register-admin',
  registerCustomer: '/customer',
  registerBook: '/book',

  /* GET */
  bookList: '/book',
  adminList: '/admin-role',
  customerList: '/customer-role',
  // ------------
  bookDetail: '/book',
  customerDetail: '/customer',
};

export const callAPI = async (endpoint, method, header = {}, params = {}, data = {}) => {
  const defaultHeader = {
    'Content-Type': 'application/json; charset=UTF-8',
  };

  const headers = merge(defaultHeader, header);
  const options = {
    url: config.api.host + endpoint,
    method,
    headers,
    data,
    params,
  };

  return request(options).then((response) => {
    const responseAPI = response.data;
    return responseAPI;
  });
};

export const ping = () => callAPI(urls.ping, 'GET');
export const login = (user) => callAPI(urls.login, 'POST', {}, {}, user);

export const getBookList = () => callAPI(urls.bookList, 'GET');
export const getAdminList = (header) => callAPI(urls.adminList, 'GET', header);
export const getCustomerList = (header) => callAPI(urls.customerList, 'GET', header);
export const getBookDetail = (id) => callAPI(`${urls.bookDetail}/${id}`, 'GET');
export const getCustomerDetail = (id, header) => callAPI(`${urls.customerDetail}/${id}`, 'GET', header);

export const editUser = (id, user, header) => callAPI(`${urls.editUser}${id}`, 'PATCH', header, {}, user);
export const editProfile = (user, header) => callAPI(urls.editProfile, 'PATCH', header, {}, user);
export const editPassword = (user, header) => callAPI(urls.editPassword, 'PATCH', header, {}, user);

export const registerAdmin = (user, header) => callAPI(urls.registerAdmin, 'POST', header, {}, user);
export const registerCustomer = (user, header) => callAPI(urls.registerCustomer, 'POST', header, {}, user);
export const registerBook = (book, header) => callAPI(urls.registerBook, 'POST', header, {}, book);
