import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectBookListState = (state) => state.bookList || initialState;

export const selectBookList = createSelector(selectBookListState, (state) => state.books);
