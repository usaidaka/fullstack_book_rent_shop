import { GET_CATEGORY, GET_DASHBOARD, SET_CATEGORY, SET_DASHBOARD } from './constants';

export const getCategoryList = (cb) => ({
  type: GET_CATEGORY,
  cb,
});

export const setCategoryList = (categories) => ({
  type: SET_CATEGORY,
  categories,
});

export const getDashboard = (cb) => ({
  type: GET_DASHBOARD,
  cb,
});

export const setDashboard = (dashboard) => ({
  type: SET_DASHBOARD,
  dashboard,
});
