import { produce } from 'immer';
import { SET_CUSTOMER } from './constants';

export const initialState = {
  user: {},
};

export const storedKey = ['user'];

const registerCustomerReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_CUSTOMER:
        draft.user = action.user;
        break;
    }
  });

export default registerCustomerReducer;
