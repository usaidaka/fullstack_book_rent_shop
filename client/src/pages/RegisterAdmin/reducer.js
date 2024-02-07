import { produce } from 'immer';
import { SET_ADMIN } from './constants';

export const initialState = {
  user: {},
};

export const storedKey = ['user'];

const registerReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_ADMIN:
        draft.user = action.user;
        break;
      default:
        break;
    }
  });

export default registerReducer;
