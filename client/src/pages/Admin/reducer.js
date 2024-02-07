import { produce } from 'immer';
import { SET_ADMIN } from './constants';

export const initialState = {
  admins: [],
};

export const storedKey = ['admin'];

const adminReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_ADMIN:
        draft.admins = action.admins;
        break;
    }
  });

export default adminReducer;
