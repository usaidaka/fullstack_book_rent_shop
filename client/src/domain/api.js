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
  editBook: '/book',

  /* REGISTER */
  registerAdmin: '/register-admin',
  registerCustomer: '/customer',
  registerBook: '/book',
  registerLending: '/lending',

  /* GET */
  bookList: '/book',
  adminList: '/admin-role',
  customerList: '/customer-role',
  categoryList: '/categories',
  lendingList: '/lending',
  myLendingList: '/my-lending',
  dashboardList: '/dashboard',
  // ------------
  bookDetail: '/book',
  customerDetail: '/customer',

  /* DELETE */
  deleteLending: '/lending',
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

/* GET LIST */
export const getBookList = () => callAPI(urls.bookList, 'GET');
export const getAdminList = () => callAPI(urls.adminList, 'GET');
export const getCustomerList = () => callAPI(urls.customerList, 'GET');
export const getCategoryList = () => callAPI(urls.categoryList, 'GET');
export const getLendingList = () => callAPI(urls.lendingList, 'GET');
export const getMyLendingList = () => callAPI(urls.myLendingList, 'GET');
export const getDashboard = () => callAPI(urls.dashboardList, 'GET');

/* GET DETAIL */
export const getBookDetail = (id) => callAPI(`${urls.bookDetail}/${id}`, 'GET');
export const getCustomerDetail = (id) => callAPI(`${urls.customerDetail}/${id}`, 'GET');

/* PATCH */
export const editUser = (id, user) => {
  const headers = {
    'Content-Type': 'multipart/form-data; charset=UTF-8',
  };
  return callAPI(`${urls.editUser}/${id}`, 'PATCH', headers, {}, user);
};
export const editProfile = (user) => {
  const headers = {
    'Content-Type': 'multipart/form-data; charset=UTF-8',
  };
  return callAPI(urls.editProfile, 'PATCH', headers, {}, user);
};
export const editPassword = (data) => callAPI(urls.editPassword, 'PATCH', {}, {}, data);
export const editBook = (id, book) => {
  const headers = {
    'Content-Type': 'multipart/form-data; charset=UTF-8',
  };
  return callAPI(`${urls.editBook}/${id}`, 'PATCH', headers, {}, book);
};

/* POST */
export const registerAdmin = (user) => callAPI(urls.registerAdmin, 'POST', {}, {}, user);
export const registerCustomer = (user) => callAPI(urls.registerCustomer, 'POST', {}, {}, user);
export const registerBook = (book) => {
  const headers = {
    'Content-Type': 'multipart/form-data; charset=UTF-8',
  };

  return callAPI(urls.registerBook, 'POST', headers, {}, book);
};
export const registerLending = (data) => callAPI(urls.registerLending, 'POST', {}, {}, data);

/* DELETE */
export const deleteLending = (data) => callAPI(`${urls.deleteLending}`, 'DELETE', {}, {}, data);
