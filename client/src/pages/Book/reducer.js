import { produce } from 'immer';
import { SET_BOOK } from './constants';

export const initialState = {
  books: [],
};

export const storedKey = ['books'];

const bookReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_BOOK:
        draft.books = action.books;
        break;
    }
  });

export default bookReducer;
