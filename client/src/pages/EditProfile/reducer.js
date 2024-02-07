import { produce } from 'immer';
import { EDIT_PROFILE } from './constants';

export const initialState = {
  user: {},
};

export const storedKey = ['user'];

const editProfileReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case EDIT_PROFILE:
        draft.user = action.user;
        break;
      default:
        break;
    }
  });

export default editProfileReducer;
