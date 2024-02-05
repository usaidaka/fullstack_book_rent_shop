import { produce } from 'immer';
import { SET_USER } from './constants';

export const initialState = {
  user: {},
};

export const storedKey = ['user'];

const registerReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_USER:
        draft.user = action.user;
        break;
      default:
        break;
    }
  });

export default registerReducer;
