import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectDashboardState = (state) => state.dashboardData || initialState;

export const selectCategoryList = createSelector(selectDashboardState, (state) => state.categories);
export const selectDashboardData = createSelector(selectDashboardState, (state) => state.dashboard);
