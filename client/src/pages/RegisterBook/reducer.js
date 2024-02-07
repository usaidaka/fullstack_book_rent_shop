import { produce } from 'immer';
import { SET_BOOK } from './constants';

export const initialState = {
  book: {},
};

export const storedKey = ['book'];

const registerBookReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_BOOK:
        draft.book = action.book;
        break;
    }
  });

export default registerBookReducer;
