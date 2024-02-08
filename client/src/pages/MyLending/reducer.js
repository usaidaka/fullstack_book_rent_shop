import { produce } from 'immer';
import { SET_MY_LENDING } from './constants';

export const initialState = {
  myLending: {},
};

export const storedKey = ['myLending'];

const getMyLendingListReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_MY_LENDING:
        draft.myLending = action.myLending;
        break;
    }
  });

export default getMyLendingListReducer;
