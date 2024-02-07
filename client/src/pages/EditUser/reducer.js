import { produce } from 'immer';
import { SET_USER_BY_ID } from './constants';

export const initialState = {
  user: {},
};

export const storedKey = [''];

const editUserReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    console.log(action);
    switch (action.type) {
      case SET_USER_BY_ID:
        draft.user = action.user;
        break;
    }
  });

export default editUserReducer;
