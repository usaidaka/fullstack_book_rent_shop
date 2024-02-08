import { produce } from 'immer';
import { SET_CATEGORY, SET_DASHBOARD } from './constants';

export const initialState = {
  categories: [],
  dashboard: {},
};

export const storedKey = ['categories'];

const getAllDashboardData = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_CATEGORY:
        draft.categories = action.categories;
        break;
      case SET_DASHBOARD:
        draft.dashboard = action.dashboard;
        break;
    }
  });

export default getAllDashboardData;
