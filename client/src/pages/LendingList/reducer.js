import { produce } from 'immer';
import { SET_LENDING } from './constants';

export const initialState = {
  lending: {},
};

export const storedKey = ['lending'];

const getLendingListReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_LENDING:
        draft.lending = action.lending;
        break;
    }
  });

export default getLendingListReducer;
