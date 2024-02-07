import { produce } from 'immer';
import { SET_BOOK_BY_ID } from './constants';

export const initialState = {
  book: {},
};

export const storedKey = [''];

const editBookReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    console.log(action);
    switch (action.type) {
      case SET_BOOK_BY_ID:
        draft.book = action.book;
        break;
    }
  });

export default editBookReducer;
