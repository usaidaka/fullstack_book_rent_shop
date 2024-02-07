import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectBookDetailState = (state) => state.bookDetail || initialState;

export const selectBookDetail = createSelector(selectBookDetailState, (state) => state.book);
